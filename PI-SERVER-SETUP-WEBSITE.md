# Self-Hosting on a Raspberry Pi 5 — Complete Setup Guide

> A complete, step-by-step record of my Raspberry Pi home server build. Every
> service, every container, every config — from flashing the SD card to a
> full media + AI + photo server on my home network.
>
> **Last updated:** August 2026 · Hardware: Raspberry Pi 5 Model B · Ubuntu 24.04 LTS

---

## Table of Contents

1. [The Big Picture](#1-the-big-picture)
2. [Hardware & Parts](#2-hardware--parts)
3. [Step 1 — Flash Ubuntu 24.04](#step-1--flash-ubuntu-2404)
4. [Step 2 — First Boot & SSH](#step-2--first-boot--ssh)
5. [Step 3 — Storage Layout](#step-3--storage-layout)
6. [Step 4 — Base Packages](#step-4--base-packages)
7. [Step 5 — Docker Setup](#step-5--docker-setup)
8. [Step 6 — DNS with Unbound + AdGuard](#step-6--dns-with-unbound--adguard)
9. [Step 7 — Tailscale Mesh VPN](#step-7--tailscale-mesh-vpn)
10. [Step 8 — Nginx Reverse Proxy](#step-8--nginx-reverse-proxy)
11. [Step 9 — The App Stacks](#step-9--the-app-stacks)
12. [Step 10 — Immich Photo Server](#step-10--immich-photo-server)
13. [Step 11 — Samba File Sharing](#step-11--samba-file-sharing)
14. [Step 12 — Cron & Network Watchdogs](#step-12--cron--network-watchdogs)
15. [Step 13 — Backups](#step-13--backups)
16. [Final Checklist](#final-checklist)
17. [Lessons Learned](#lessons-learned)

---

## 1. The Big Picture

A single Raspberry Pi 5 runs my entire home server stack:

- **Media**: Plex, Jellyfin, Sonarr/Radarr/Lidarr/Jackett/qBittorrent/Bazarr, Overseerr
- **Photos**: Immich (self-hosted Google Photos)
- **Cloud storage**: Nextcloud + OnlyOffice + Collabora
- **AI**: Ollama + Open WebUI + Qdrant
- **Dashboard**: Heimdall, Dashy, Glance (system monitoring)
- **Networking**: Tailscale (mesh VPN), Unbound (DNS), AdGuard Home (ad blocking)
- **Management**: Portainer, File Browser, Wetty (web SSH), pi-health dashboard
- **Automation**: n8n + ngrok

Everything runs in Docker (25+ containers), with data spread across three drives:

| Drive | Size | Purpose | Mount |
|-------|------|---------|-------|
| SD card | 32 GB | Operating system | `/` |
| Samsung T5 SSD | 465 GB | Docker data + all app configs | `/mnt/t5` |
| WD HDD | 1.8 TB | Media library (movies, TV, music, photos) | `/mnt/wdhdd` |

---

## 2. Hardware & Parts

- **Raspberry Pi 5 Model B (Rev 1.1)** — 8 GB RAM recommended
- **32 GB+ microSD card** — OS only
- **Samsung T5 SSD (465 GB)** — apps & Docker
- **WD HDD (1.8 TB)** — media library
- **Powered USB hub** — the Pi 5 can't power both drives reliably on its own
- **DuckDNS domain** — free dynamic DNS for remote access
- **Tailscale account** — free mesh VPN

---

## Step 1 — Flash Ubuntu 24.04

The server runs **Ubuntu 24.04.4 LTS (Noble Numbat)** for arm64.

1. Download **Raspberry Pi Imager** (official tool).
2. Choose `Other general-purpose OS → Ubuntu → Ubuntu Server 24.04 LTS (64-bit)`.
   - Raspberry Pi OS 64-bit also works; Ubuntu is what this guide uses.
3. Click the gear icon (advanced options) and set **before flashing**:
   - Hostname: `wamik` (or your choice)
   - Enable SSH, set your username + password
   - Wi-Fi SSID/password + locale/timezone if needed
4. Flash to the SD card. This pre-configures everything so you never need a
   monitor and keyboard.

> The arm64 Ubuntu image already enables the important Pi settings in
> `/boot/firmware/config.txt` (64-bit kernel, I2C/SPI/UART on, KMS video driver,
> USB device mode for the Pi 5). No manual edits needed unless you use GPIO pins.

---

## Step 2 — First Boot & SSH

```bash
# From your computer — replace <pi-ip> with the Pi's IP on your network
ssh wamik@<pi-ip>

# Update everything immediately
sudo apt update
sudo apt full-upgrade -y
```

Create a backup SSH key on your Mac so password logins aren't needed later:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/immich_backup -N ""
ssh-copy-id -i ~/.ssh/immich_backup wamik@<pi-ip>
# add to ~/.ssh/config
#   Host immich-server
#       HostName <pi-ip>
#       User wamik
#       IdentityFile ~/.ssh/immich_backup
```

---

## Step 3 — Storage Layout

The Pi boots from the SD card, but **all the heavy data lives on the external
drives**. Everything in Docker references these mount points.

### Identify the drives

```bash
lsblk -f          # shows filesystems, UUIDs, mount points
sudo blkid        # shows UUIDs for each drive
```

You want the **UUID** (not `/dev/sdX` — those letters change between boots).

### Create mount points + fstab entries

```bash
sudo mkdir -p /mnt/t5 /mnt/wdhdd
sudo nano /etc/fstab
```

Add these lines (replace `<t5-uuid>` and `<wd-uuid>` with yours):

```fstab
LABEL=writable       /                ext4   defaults,nofail              0 1
LABEL=system-boot    /boot/firmware   vfat   defaults                     0 1
UUID=<t5-uuid>       /mnt/t5          ext4   defaults,nofail              0 2
UUID=<wd-uuid>       /mnt/wdhdd       ext4   defaults,nofail,noatime      0 2
/swapfile            none             swap   sw                           0 0
```

> `nofail` is critical — the Pi must boot even if a USB drive is unplugged.

```bash
sudo mount -a
findmnt            # verify both drives mounted
```

### Swapfile (2 GB)

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

---

## Step 4 — Base Packages

```bash
sudo apt install -y git vim tmux htop glances curl wget \
  tailscale unbound samba smbclient \
  smartmontools lm-sensors rsync hdparm \
  nodejs npm python3-pip python3-venv openssh-server \
  software-properties-common avahi-daemon
```

**Docker** comes from Docker's own repo, not Ubuntu. The official installer does
everything:

```bash
curl -fsSL https://get.docker.com | sh
```

---

## Step 5 — Docker Setup

### Critical: keep Docker data off the SD card

The SD card is only 29 GB — a few containers fill it. So I moved Docker's data
root to the T5 SSD *before* starting the service:

```bash
sudo mkdir -p /etc/docker
sudo nano /etc/docker/daemon.json
```

```json
{
  "data-root": "/mnt/t5/docker",
  "dns": ["8.8.8.8", "1.1.1.1"]
}
```

```bash
sudo usermod -aG docker wamik     # allow your user to run docker without sudo
sudo systemctl enable --now docker
```

> Verify: `docker info | grep "Docker Root Dir"` should show `/mnt/t5/docker`.

### Portainer (container management UI)

```bash
mkdir -p ~/portainer && cd ~/portainer
```

`docker-compose.yml`:

```yaml
version: '3.8'

services:
  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    restart: always
    ports:
      - "9000:9000"   # Web UI
      - "8000:8000"   # Edge agent communication (optional)
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /mnt/t5/portainer_data:/data
```

```bash
docker compose up -d
# open http://192.168.0.211:9000 and create your admin account
```

---

## Step 6 — DNS with Unbound + AdGuard

Two DNS layers protect the network: **Unbound** (the active resolver) and
**AdGuard Home** (ad-blocking dashboard).

### Unbound (local recursive DNS → forwarder)

```bash
sudo apt install -y unbound
sudo nano /etc/unbound/unbound.conf
```

```yaml
server:
    verbosity: 1
    interface: 0.0.0.0
    access-control: 127.0.0.0/8 allow
    access-control: 192.168.0.0/16 allow
    access-control: 100.64.0.0/10 allow
    port: 53
    do-ip4: yes
    do-udp: yes
    do-tcp: yes
    hide-identity: yes
    hide-version: yes
    edns-buffer-size: 1232
    prefetch: yes

forward-zone:
    name: "."
    forward-addr: 8.8.8.8
    forward-addr: 8.8.4.4
    forward-addr: 1.1.1.1
```

```bash
sudo systemctl enable --now unbound
```

Point the Pi at itself for DNS:

```bash
sudo nano /etc/resolv.conf
```

```
nameserver 127.0.0.1
nameserver 8.8.8.8
```

Test: `dig google.com @127.0.0.1` should resolve.

> The `100.64.0.0/10` allow-rule is the **Tailscale CGNAT range** — it lets
> devices on the mesh use the Pi as their DNS server from anywhere.

### AdGuard Home (ad blocking, optional)

```bash
# Download + install (see https://github.com/AdguardTeam/AdGuardHome)
curl -sSL https://static.adtidy.org/adguardhome/release/AdGuardHome_linux_arm64.tar.gz | tar -xz
sudo mv AdGuardHome /opt/
cd /opt/AdGuardHome && sudo ./AdGuardHome -s install
```

Web UI on `http://192.168.0.211:82`, DNS on port 53. It's configured but I run
Unbound as the primary resolver.

---

## Step 7 — Tailscale Mesh VPN

Tailscale gives private, encrypted access to the Pi from any device — no port
forwarding needed.

```bash
sudo tailscale up --advertise-exit-node
```

- This is a **new node** — approve it in the Tailscale admin console.
- `--advertise-exit-node` lets the Pi act as an exit node for your phone/laptop.
- The Pi's Tailscale IP is `100.123.199.118` (stable across rebuilds — it's tied
  to the node, so your other configs that reference it keep working).

> **Tip:** Immich and other apps use this Tailscale IP in their URLs so devices
> on the mesh reach the server without exposing it to the internet.

---

## Step 8 — Nginx Reverse Proxy

Nginx (as a Docker container) routes a single DuckDNS domain to every app by URL
path — so `https://wamikhossain.duckdns.org/immich/`, `/jellyfin/`, `/torrent/`
all hit the right containers.

```bash
mkdir -p ~/nginx-proxy
cd ~/nginx-proxy
```

`docker-compose.yml`:

```yaml
version: "3.8"

services:
  nginx:
    image: nginx:latest
    container_name: nginx_reverse_proxy
    restart: always
    ports:
      - "80:81"   # host port 80 → container port 81
    volumes:
      - /home/wamik/nginx-proxy/nginx.conf:/etc/nginx/nginx.conf:ro
```

`nginx.conf` — path-based routing for the public domain:

```nginx
events {}

http {
    server {
        listen 81;
        server_name wamikhossain.duckdns.org;

        location /portainer/  { proxy_pass http://192.168.0.211:9000/; }
        location /jellyfin/   { proxy_pass http://192.168.0.211:8096/; }
        location /immich/     { proxy_pass http://192.168.0.211:2283/; }
        location /movies/     { proxy_pass http://192.168.0.211:5055/; }  # Overseerr
        location /dashboard/  { proxy_pass http://192.168.0.211:8080/; }  # Heimdall
        location /filebrowser/ { proxy_pass http://192.168.0.211:8095/; }
        location /torrent/    { proxy_pass http://192.168.0.211:8282/; }  # qBittorrent
        location /nextcloud/  { proxy_pass http://192.168.0.211:8888/; }
        location /adguard/    { proxy_pass http://192.168.0.211:82/; }
        location /netdata/    { proxy_pass http://192.168.0.211:19999/; }

        # WebSocket-friendly headers for the above
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Plus a second set of `server` blocks using `.home` subdomains
(`portainer.home`, `immich.home`, …) for LAN-only access.

Test the config inside the container before reloading:

```bash
docker compose up -d
docker exec nginx_reverse_proxy nginx -t
docker exec nginx_reverse_proxy nginx -s reload
```

**DuckDNS** keeps the domain pointed at your public IP:
`https://www.duckdns.org/update?domains=wamikhossain&token=<your-token>&ip=`
(usually automated via a cron entry or DuckDNS's own client).

---

## Step 9 — The App Stacks

All compose files are versioned in my GitHub repo:
**[`wamik25apr/docker-compose-collection`](https://github.com/wamik25apr/docker-compose-collection)**

```bash
git clone https://github.com/wamik25apr/docker-compose-collection /mnt/t5/
```

> **Deploy order matters.** Start DNS → Tailscale → nginx first, then everything
> else, and **Immich last**. Getting the order wrong causes the "DNS cascade"
> problem described in Lessons Learned.

### Port map reference

| Service | Host port | Purpose |
|---------|-----------|---------|
| Portainer | 9000 | Container management |
| Immich (web) | 2284 | Photo app frontend |
| Immich (api) | 2283 | Photo app backend |
| Heimdall | 8080 | Dashboard |
| File Browser | 8095 | Web file manager |
| Nextcloud | 8888 | Cloud storage |
| OnlyOffice | 9981 | Nextcloud document editing |
| Collabora | 9980 | LibreOffice online |
| Dashy | 4000 | Alternative dashboard |
| Wetty | 3001 | Web terminal (SSH in browser) |
| pi-health | 81 | Service health dashboard |
| Overseerr | 5055 | Request movies/shows |
| qBittorrent | 8282 | Torrent client |
| Jellyfin | host | Media server |
| Plex | host | Media server |
| Sonarr | 8899 | TV show manager |
| Radarr | 7879 | Movie manager |
| Lidarr | 8687 | Music manager |
| Jackett | 9118 | Torrent indexers |
| Bazarr | 6768 | Subtitles |
| Prowlarr | 9696 | Indexer manager |
| Flaresolverr | 8191 | Cloudflare bypass for Prowlarr |
| Ollama | 11434 | Local LLM API |
| Open WebUI | 3002 | LLM chat UI |
| Qdrant | 6333 | Vector database |
| n8n | 5678 | Workflow automation |
| ngrok | 4040 | Public tunnel for n8n |
| Netdata | host | System monitoring |
| Glance | host | System monitoring |
| AdGuard | 82 | Ad-blocking DNS dashboard |

### Media stack (`plex/`)

A complete *arr stack with qBittorrent:

```yaml
services:
  sonarr:      # TV shows — /mnt/wdhdd/TV, port 8899
  radarr:      # Movies — /mnt/wdhdd/Movies, port 7879
  lidarr:      # Music — /mnt/wdhdd/Music, port 8687
  jackett:     # Torrent indexers — port 9118
  qbittorrent: # Downloads — /mnt/t5/plex/downloads, ports 8282 + 6881
  bazarr:      # Subtitles — port 6768
```

All use `PUID=1000 / PGID=1003` (the `wamik` user) and `TZ=Asia/Kolkata`.

### Jellyfin (`jellyfin/`)

```yaml
services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    network_mode: host
    privileged: true
    volumes:
      - /mnt/t5/jellyfin/config:/config
      - /mnt/wdhdd/Movies:/media/movies
      - /mnt/wdhdd/TV:/media/tv
      - /mnt/wdhdd/Music:/media/music
    environment:
      - TZ=Asia/Kolkata
```

### Nextcloud + OnlyOffice (`nextcloud/`)

```yaml
services:
  db:        # MariaDB 10.11 — /mnt/t5/nextcloud_db
  app:       # Nextcloud apache — port 8888, data on /mnt/wdhdd/nextcloud
  onlyoffice: # Document server — port 9981, JWT secured
```

### AI stack (`ai-stack/`)

```yaml
services:
  ollama:      # Local LLM — port 11434, models in ./ollama
  open-webui:  # Chat UI — port 3002
  qdrant:      # Vector DB for RAG — port 6333
```

### n8n + ngrok (`n8n/`)

Workflow automation exposed to the internet through a free ngrok domain, with
resource caps so a big workflow can't crash the Pi:

```yaml
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    ports: ["5678:5678"]
    environment:
      - N8N_HOST=<your-ngrok-domain>
      - N8N_PROTOCOL=https
      - NODE_OPTIONS=--max-old-space-size=2048
      - EXECUTIONS_TIMEOUT=300
    deploy:
      resources:
        limits: { cpus: "3.0", memory: 3g }
  ngrok:
    image: ngrok/ngrok:latest
    command: ["http", "--domain=<your-ngrok-domain>", "n8n:5678"]
    ports: ["4040:4040"]
```

> The n8n Docker network uses MTU 1400 (lowered from 1500) — the fix for
> ECONNRESET errors on large AI responses over Wi-Fi/Tailscale.

### Dashboards

- **Heimdall** (`heimdall/`) — port 8080, the main start page
- **Dashy** (`dashy/`) — port 4000, config at `./dashy-config.yml`
- **Glance** (`Glance/`) — `nicolarfo/glances:latest`, host-network, privileged,
  mounts the whole host FS read-only to show disk/CPU/RAM
- **Netdata** (`Netdata/`) — custom image (`netdata-with-smartctl`) built from
  the repo's `Dockerfile` (adds `smartmontools` + a SMART disk collector), shows
  real-time metrics including drive health
- **pi-health** (`pi-health/`) — custom-built Debian container that runs a
  healthcheck script and serves an HTML dashboard on port 81 listing every
  service UP/DOWN by checking its port on the Tailscale IP

### Management tools

- **File Browser** (`Browser/`) — port 8095, file manager for `/mnt/t5`, `/home/wamik`
- **Wetty** (`witty/`) — port 3001, SSH terminal in the browser
- **Prowlarr + Flaresolverr** (`prowlarr/`) — ports 9696 + 8191

### Build the custom images

```bash
cd /mnt/t5/Netdata && docker compose build && docker compose up -d
cd /mnt/t5/pi-health && docker compose build && docker compose up -d
```

---

## Step 10 — Immich Photo Server

Immich is my self-hosted Google Photos — auto-backup of my phone's camera roll
plus AI face/smart-search.

```yaml
services:
  immich-server:          # API + upload, port 2283
  immich-web:             # Frontend, port 2284
  immich-microservices:   # Background jobs
  immich-machine-learning: # Face + object recognition
  immich-redis:           # redis:6
  immich-db:              # ankane/pgvector (Postgres + vector search)
```

Key settings:
- **Uploads** live on the SSD: `/mnt/t5/immich/photos → /usr/src/app/upload`
- **Library** is read-only from the HDD: `/mnt/wdhdd/Photo → /usr/src/app/library:ro`
- CPU-capped at 3 cores per heavy container so the Pi stays responsive
- Web frontend points at the Tailscale IP: `IMMICH_SERVER_URL=http://100.123.199.118:2283`

```bash
cd /mnt/t5/immich && docker compose up -d
# open http://192.168.0.211:2284, create admin, install the mobile app
```

### Restore from backup (if rebuilding)

```bash
# 1. connect the T7 backup drive, then restore the Postgres dump:
gunzip -c latest.sql.gz | docker exec -i -e PGPASSWORD=immich immich-db psql -U immich immich
# 2. copy photos back:
rsync -a /mnt/t7/immich/photos/ /mnt/t5/immich/photos/
# 3. start the stack and let thumbnails regenerate
```

---

## Step 11 — Samba File Sharing

Share the media drives to Windows/Mac/Linux machines on the LAN:

```bash
sudo apt install -y samba
sudo smbpasswd -a wamik   # set the Samba password for your user
sudo nano /etc/samba/smb.conf
```

```ini
[global]
   workgroup = WORKGROUP
   server string = Raspberry Pi
   security = user
   map to guest = Bad User

[Media]
   path = /mnt/wdhdd
   browseable = yes
   read only = no
   valid users = wamik
```

```bash
sudo systemctl enable --now smbd nmbd
```

---

## Step 12 — Cron & Network Watchdogs

These little scripts fix the two things that break most often on a home server:
**the static IP dying after a router reboot** and **Tailscale/DNS getting stuck**.

### arp-keepalive.sh (network watchdog)

Runs **every minute**. Flushes stale ARP cache, pings the router; if the router
is unreachable it re-adds the static IP, re-adds the default route, and restarts
sshd so SSH survives a router reboot:

```bash
#!/bin/bash
# /usr/local/bin/arp-keepalive.sh
ROUTER_IP="192.168.0.1"
INTERFACE="eth0"
PI_IP="192.168.0.211"

ip neigh flush to $ROUTER_IP

if ! ping -c 1 -W 2 $ROUTER_IP > /dev/null 2>&1; then
    killall dhclient > /dev/null 2>&1
    ip link set $INTERFACE down; sleep 2; ip link set $INTERFACE up; sleep 3
    ip addr add $PI_IP/24 dev $INTERFACE 2>/dev/null
    ip route add default via $ROUTER_IP dev $INTERFACE 2>/dev/null
    systemctl restart sshd > /dev/null 2>&1
fi
ping -c 2 $ROUTER_IP > /dev/null 2>&1
ping -c 2 -b 192.168.0.255 > /dev/null 2>&1
```

Install it:

```bash
sudo cp arp-keepalive.sh /usr/local/bin/
sudo chmod +x /usr/local/bin/arp-keepalive.sh
echo '* * * * * root /usr/local/bin/arp-keepalive.sh' | sudo tee /etc/cron.d/arp-keepalive
```

### tailscale-watchdog.sh

Restarts Tailscale if its node vanishes from the mesh, and restarts Unbound if
DNS stops resolving:

```bash
#!/bin/bash
if ! tailscale status 2>/dev/null | grep -q "100.123.199.118"; then
    logger "tailscale-watchdog: Tailscale stuck, restarting..."
    systemctl restart tailscaled; sleep 10
    tailscale up --accept-dns=false --advertise-exit-node
fi
if ! dig google.com @127.0.0.1 +short +time=3 > /dev/null 2>&1; then
    logger "tailscale-watchdog: DNS broken, restarting unbound..."
    systemctl restart unbound
fi
```

---

## Step 13 — Backups

Three backup layers protect the data — all scripts live in my
`~/Scripts/` folder on the Mac (a git repo):

### 1. Immich backup (T7 SSD) — `immich_backup.sh`

Mirrors photos and dumps the Postgres database to a Samsung T7 SSD, run **from
the Mac with the T7 connected**:

```bash
./immich_backup.sh backup     # photos (rsync) + DB dump
./immich_backup.sh list       # list DB dumps + last sync time
./immich_backup.sh verify     # compare file counts source vs T7
./immich_backup.sh restore    # restore to the Pi (with confirmation)
```

Config (edit the block at the top of the script):

| Setting | Value |
|---------|-------|
| Remote (Pi) | `immich-server` via `~/.ssh/immich_backup` |
| Photos (Pi) | `/mnt/t5/immich/photos` |
| DB container | `immich-db` (user/db `immich`) |
| T7 root | `/Volumes/T7/Immich_backup` (photos + database + logs) |
| DB retention | last 10 dumps; photos never pruned |

- Uses `rsync --partial` — safe to interrupt and resume
- **Never deletes** from the backup (no `--delete`) — even if you delete photos
  from Immich, they stay on the T7
- Sends macOS notifications on completion/failure

### 2. Media dedupe — `dedupe_media.sh`

Finds duplicate photos/videos on the T7 (the raw iPhone backups). Groups by
file size, then SHA-256-hashes only the size-collision candidates (fast), and
**moves** confirmed duplicates to a quarantine folder for manual review —
never deletes.

- Scans `/Volumes/T7/wamikiphone`, `/Volumes/T7/iphonebackup`,
  `/Volumes/T7/karishma_Iphone`
- Quarantine: `/Volumes/T7/_duplicates_quarantine`
- **Resumable** — logs progress to `~/dedupe_work/`; re-run to pick up where it
  left off
- Supported formats: jpg jpeg png gif heic heif bmp tiff webp mp4 mov avi mkv m4v 3gp

### 3. Dedupe against Immich — `dedupe_against_immich.sh`

Quarantines files in the raw iPhone backups that **already exist in the Immich
backup** — so you don't keep two copies of the same photo. Reads the
`/Volumes/T7/Immich_backup` reference set (never modified), hashes it, then
hashes the source folders; matches are moved to quarantine.

- Reference: `/Volumes/T7/Immich_backup` (trusted, read-only)
- Sources: same three iPhone backup folders
- Quarantine: `/Volumes/T7/_immich_duplicates_quarantine`
- **Resumable** — logs to `~/dedupe_immich_work/`
- Speed trick: only hashes source files whose size matches something in the
  reference set

### 4. System config snapshot (`pi-snapshot.sh`)

A read-only script I run on the Pi to capture every piece of configuration
(packages, services, cron, storage, network, Docker stacks), so the whole setup
can be rebuilt from scratch — the source for this guide:

```bash
# on the Pi
./pi-snapshot.sh          # creates ~/pi-snapshots/<timestamp>/
```

---

## Final Checklist

After a fresh rebuild, verify every one of these:

- [ ] `findmnt` shows `/mnt/t5` + `/mnt/wdhdd` mounted by UUID
- [ ] `docker info | grep "Docker Root Dir"` → `/mnt/t5/docker`
- [ ] `docker ps` — all 25+ containers running
- [ ] `dig google.com @127.0.0.1` resolves (Unbound up)
- [ ] `tailscale status` — node online at `100.123.199.118`
- [ ] `curl -I http://wamikhossain.duckdns.org/portainer/` → 200
- [ ] Immich library loads, photo count matches backup
- [ ] Samba shares mountable from a Windows/Mac client
- [ ] `/etc/cron.d/arp-keepalive` present (network watchdog)
- [ ] `swapon --show` → 2G swap active
- [ ] `smartctl -H /dev/sda` and `/dev/sdb` → health OK

---

## Lessons Learned

**The DNS cascade.** After a router reboot, Docker + Tailscale + Unbound + AdGuard
can fight over DNS and the static IP breaks. Two things fix it: the
`arp-keepalive.sh` cron watchdog (re-adds the IP/route and restarts sshd) and
deploying **DNS → Tailscale → nginx first**, everything else after, Immich last.

**Keep Docker off the SD card.** The 29 GB SD fills in days. `data-root` on the
SSD is non-negotiable.

**Use UUIDs, not device letters.** `/dev/sda`/`/dev/sdb` swap between boots. The
fstab must reference UUIDs (with `nofail`).

**Tailscale IPs are stable; LAN IPs aren't.** Point app URLs at the Tailscale IP
(`100.x.x.x`) so they survive LAN reconfigures.

**Cap the heavy containers.** Immich (cpus: 3), n8n (mem: 3g), Jellyfin
(mem: 3G) — otherwise a background job can OOM the whole Pi.

**Lower MTU for tunneled networks.** n8n's network uses MTU 1400 to fix
ECONNRESET on large AI responses over Wi-Fi/Tailscale.

**Version your compose files.** Every stack lives in the GitHub repo
`docker-compose-collection` — a rebuild is one `git clone` away.

**Version your backup scripts too.** `immich_backup.sh`, `dedupe_media.sh`, and
`dedupe_against_immich.sh` live in a git repo (`~/Scripts/`). If the T7 dies, you
recreate the folder layout — not the logic.

---

*All configs, scripts, and this guide are reproducible from the snapshot
generated by `pi-snapshot.sh` and the compose files in
[docker-compose-collection](https://github.com/wamik25apr/docker-compose-collection).*
