import SectionHeading from "./SectionHeading";
import { resume } from "../data/resume";

export default function Summary() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="01 · About"
          title="Professional Summary"
          subtitle="A decade of architecting resilient, scalable cloud platforms across GCP, Azure, and hybrid environments."
        />
        <div className="relative rounded-2xl border border-violet-500/15 bg-gradient-to-br from-white/[0.04] to-transparent p-6 sm:p-10">
          <div
            aria-hidden
            className="absolute left-0 top-0 h-full w-1 rounded-full bg-gradient-to-b from-violet-500 via-fuchsia-500 to-violet-500"
          />
          <p className="text-base leading-relaxed text-slate-300 sm:text-lg">{resume.summary}</p>
        </div>
      </div>
    </section>
  );
}
