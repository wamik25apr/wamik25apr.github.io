import SectionHeading from "./SectionHeading";
import { resume } from "../data/resume";

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="02 · Stack"
          title="Technical Skills"
          subtitle="Deep expertise across cloud platforms, container orchestration, IaC, and observability."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resume.skills.map((skill, i) => (
            <div
              key={skill.group}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-violet-500/40 hover:bg-violet-500/[0.06]"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold text-violet-500">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-sm font-bold tracking-wide text-white uppercase">{skill.group}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
