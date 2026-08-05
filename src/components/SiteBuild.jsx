import MarkdownPage from "./MarkdownPage";
import siteMarkdown from "../../SITE-DEVELOPMENT.md?raw";

export default function SiteBuild() {
  return (
    <MarkdownPage
      markdown={siteMarkdown}
      page="site"
      eyebrow="Site Build"
      title="Building & Maintaining This Site"
      subtitle="The stack, the workflow, and the conventions that keep this portfolio easy to update."
    />
  );
}
