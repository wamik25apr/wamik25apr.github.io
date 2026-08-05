import MarkdownPage from "./MarkdownPage";
import guideMarkdown from "../../PI-SERVER-SETUP-WEBSITE.md?raw";

export default function Homelab() {
  return (
    <MarkdownPage
      markdown={guideMarkdown}
      page="homelab"
      eyebrow="Homelab · Raspberry Pi 5"
      title="Self-Hosting on a Raspberry Pi 5"
      subtitle="A complete record of my home server build — every service, every container, every config."
    />
  );
}
