import SectionHeading from "./SectionHeading";
import { resume } from "../data/resume";

function ExperienceCard({ job, isLast }) {
  return (
    <li className="relative pl-12">
      <div
        aria-hidden
        className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-violet-400/50 bg-[#0d0817]"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500" />
      </div>
      {!isLast && (
        <div aria-hidden className="absolute left-[11px] top-9 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-violet-500/40 to-violet-500/5" />
      )}

      <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-all hover:border-violet-500/40 hover:bg-violet-500/[0.05] sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white sm:text-xl">{job.company}</h3>
            <p className="mt-0.5 text-sm font-medium text-violet-300">{job.title}</p>
          </div>
          <div className="text-right">
            <span className="inline-block rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 font-mono text-xs text-fuchsia-300">
              {job.period}
            </span>
            <p className="mt-1.5 text-xs text-slate-400">{job.location}</p>
          </div>
        </div>

        {job.highlight && (
          <p className="mt-4 text-sm font-semibold text-slate-200">{job.highlight}</p>
        )}

        <ul className="mt-4 space-y-2.5">
          {job.bullets.map((bullet) => {
            const colon = bullet.indexOf(":");
            const label = colon > 0 ? bullet.slice(0, colon + 1) : null;
            const rest = colon > 0 ? bullet.slice(colon + 1) : bullet;
            return (
              <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-slate-400">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                <span>
                  {label && <span className="font-semibold text-violet-200">{label}</span>}
                  {rest}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 h-[24rem] w-[24rem] rounded-full bg-violet-700/15 blur-[120px]"
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="03 · Career"
          title="Experience"
          subtitle="Ten years of architecting and operating enterprise cloud platforms at scale."
        />
        <ul className="space-y-10">
          {resume.experience.map((job, i) => (
            <ExperienceCard key={job.company} job={job} isLast={i === resume.experience.length - 1} />
          ))}
        </ul>
      </div>
    </section>
  );
}
