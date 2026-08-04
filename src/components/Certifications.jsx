import SectionHeading from "./SectionHeading";
import { resume } from "../data/resume";

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/4 h-[20rem] w-[20rem] rounded-full bg-indigo-700/15 blur-[120px]"
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="04 · Credentials"
          title="Certifications"
          subtitle="Vendor-validated expertise across Azure, Red Hat, and emerging AI architectures."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resume.certifications.map((cert) => (
            <div
              key={cert}
              className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition-all hover:border-violet-500/40 hover:bg-violet-500/[0.06]"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p className="text-sm font-medium leading-relaxed text-slate-300">{cert}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
