import SectionHeading from "./SectionHeading";
import { resume } from "../data/resume";

export default function Education() {
  return (
    <section id="education" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="05 · Academic"
          title="Education"
          subtitle="Fifteen years of full-time formal education: B.Tech (4 years) + Higher Secondary (2 years) + Secondary (10 years)."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {resume.education.map((item) => (
            <div
              key={`${item.institution}-${item.year}`}
              className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-all hover:border-violet-500/40 hover:bg-violet-500/[0.05]"
            >
              <span className="absolute right-5 top-5 font-mono text-xs text-violet-500">{item.year}</span>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 text-violet-300">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path
                    d="M12 3 2 8l10 5 10-5-10-5Zm-7 8v5c0 1.5 3 3 7 3s7-1.5 7-3v-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-bold text-white">{item.institution}</h3>
              <p className="mt-1 text-sm font-medium text-violet-300">{item.degree}</p>
              <p className="mt-2 font-mono text-xs text-slate-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
