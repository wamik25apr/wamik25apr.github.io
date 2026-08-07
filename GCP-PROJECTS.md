# GCP Solution Architecture Projects

> Ten end-to-end Google Cloud architecture exercises — real-world scenarios covering
> global scale, streaming data, migration, multi-tenancy, disaster recovery,
> security, analytics, Kubernetes, cost control, and media delivery. Each one
> includes a reference architecture diagram.
>
> **Last updated:** August 2026 · Google Cloud Platform

---

## Table of Contents

1. [Multi-region e-commerce platform](#1-multi-region-e-commerce-platform)
2. [Real-time data pipeline / IoT ingestion](#2-real-time-data-pipeline--iot-ingestion)
3. [Migration of a legacy on-prem monolith to GCP](#3-migration-of-a-legacy-on-prem-monolith-to-gcp)
4. [Multi-tenant SaaS architecture](#4-multi-tenant-saas-architecture)
5. [Disaster recovery design for a financial services workload](#5-disaster-recovery-design-for-a-financial-services-workload)
6. [Secure landing zone for a regulated enterprise](#6-secure-landing-zone-for-a-regulated-enterprise)
7. [Batch analytics platform for a retail company](#7-batch-analytics-platform-for-a-retail-company)
8. [Microservices deployment on GKE with zero-downtime releases](#8-microservices-deployment-on-gke-with-zero-downtime-releases)
9. [Cost optimization for a runaway BigQuery/Compute bill](#9-cost-optimization-for-a-runaway-bigquerycompute-bill)
10. [Video streaming / media platform](#10-video-streaming--media-platform)

---

## 1. Multi-region e-commerce platform

Design a highly available e-commerce site serving global traffic. Cover: Global
Load Balancer, Cloud CDN, regional GKE clusters or MIGs, Cloud SQL with
cross-region read replicas (or Spanner for strong consistency), Cloud Armor for
WAF/DDoS, and a caching layer (Memorystore).

![Multi-region e-commerce platform](/gcp/1.png)

---

## 2. Real-time data pipeline / IoT ingestion

Millions of devices sending telemetry. Design ingestion → processing → storage →
analytics. Typically: Pub/Sub → Dataflow (streaming) → BigQuery, with Bigtable
for high-throughput time-series lookups, and considerations for schema evolution
and backpressure.

![Real-time data pipeline / IoT ingestion](/gcp/2.png)

---

## 3. Migration of a legacy on-prem monolith to GCP

Lift-and-shift vs. re-platform vs. re-architect discussion. Cover: Migrate for
Compute Engine, VPC design mirroring on-prem subnets, Cloud VPN/Interconnect for
hybrid connectivity, and a phased cutover strategy (strangler pattern).

![Migration of a legacy on-prem monolith to GCP](/gcp/3.png)

---

## 4. Multi-tenant SaaS architecture

Design isolation between tenants (shared vs. siloed data), covering:
project-per-tenant vs. schema-per-tenant vs. row-level security in Cloud
SQL/Spanner, IAM boundary design, and per-tenant billing/quota tracking.

![Multi-tenant SaaS architecture](/gcp/4.png)

---

## 5. Disaster recovery design for a financial services workload

Given an RPO/RTO target (e.g., RPO 5 min, RTO 1 hr), design the DR strategy:
active-passive vs. active-active, Cloud SQL cross-region replicas or Spanner
multi-region, backup strategy, and a failover runbook (DNS/Traffic Director
based).

![Disaster recovery design for a financial services workload](/gcp/5.png)

---

## 6. Secure landing zone for a regulated enterprise

Design an org-level foundation: Organization → Folders → Projects hierarchy, VPC
Service Controls, centralized logging (Cloud Logging → BigQuery/SIEM), Shared
VPC, and least-privilege IAM with Workload Identity Federation.

![Secure landing zone for a regulated enterprise](/gcp/6.png)

---

## 7. Batch analytics platform for a retail company

Nightly ETL of POS data from thousands of stores. Design: Cloud Storage landing
zone → Dataproc or Dataflow batch jobs → BigQuery for analytics, with
orchestration via Cloud Composer and cost controls (partitioning/clustering,
slot reservations).

![Batch analytics platform for a retail company](/gcp/7.png)

---

## 8. Microservices deployment on GKE with zero-downtime releases

Design the platform: GKE Autopilot vs. Standard, Anthos Service Mesh/Istio for
traffic splitting, canary/blue-green deployment strategy, and Cloud SQL Auth
Proxy or Spanner for the data layer, plus observability (Cloud Trace, Cloud
Monitoring).

![Microservices deployment on GKE with zero-downtime releases](/gcp/8.png)

---

## 9. Cost optimization for a runaway BigQuery/Compute bill

Given a scenario where costs spiked 5x last month, walk through diagnosis (Cloud
Billing export to BigQuery, labels, committed use discounts) and fixes
(partitioned tables, BQ slot reservations vs. on-demand, rightsizing MIGs,
preemptible/Spot VMs).

![Cost optimization for a runaway BigQuery/Compute bill](/gcp/9.png)

---

## 10. Video streaming / media platform

Design ingest, transcode, and global delivery: Cloud Storage for raw uploads,
Transcoder API, Cloud CDN + signed URLs for access control, and Media CDN or
multi-region storage for low-latency delivery.

![Video streaming / media platform](/gcp/10.png)
