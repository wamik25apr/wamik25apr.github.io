import MarkdownPage from "./MarkdownPage";
import gcpMarkdown from "../../GCP-PROJECTS.md?raw";

export default function GcpProjects() {
  return (
    <MarkdownPage
      markdown={gcpMarkdown}
      page="gcp"
      eyebrow="Google Cloud Platform"
      title="GCP Solution Architecture Projects"
      subtitle="Ten end-to-end architecture exercises — global scale, streaming data, migration, multi-tenancy, disaster recovery, security, analytics, Kubernetes, cost control, and media delivery — each with a reference diagram."
    />
  );
}
