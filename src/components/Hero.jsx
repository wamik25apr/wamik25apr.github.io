import { resume } from "../data/resume";
import { contactEmailHref } from "../utils/contact";

function ContactChip({ contact }) {
  const inner = (
    <>
      <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
      <span className="truncate">{contact.value}</span>
    </>
  );
  const cls =
    "inline-flex max-w-full items-center gap-2 rounded-full border border-violet-500/20 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-slate-300 backdrop-blur transition-colors hover:border-violet-400/50 hover:text-violet-200";
  const href =
    contact.label === "Email"
      ? contactEmailHref("wamik25apr@gmail.com")
      : contact.href;
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <span className={cls}>{inner}</span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-dvh items-center pt-24 pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-violet-700/25 blur-[120px]" />
        <div className="absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-fuchsia-700/20 blur-[120px]" />
        <div className="absolute -bottom-20 -left-24 h-[24rem] w-[24rem] rounded-full bg-indigo-700/20 blur-[120px]" />
        <div className="absolute inset-0 [-webkit-mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)] [background-size:44px_44px] bg-[radial-gradient(circle_at_1px_1px,rgba(124,58,237,0.15)_1px,transparent_0)]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-violet-400 uppercase">
            Cloud Platform Architect · SRE
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {resume.name.split(" ").slice(0, 2).join(" ")}{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
              {resume.name.split(" ").slice(2).join(" ")}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {resume.tagline}
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {resume.contacts.map((c) => (
              <ContactChip key={c.label} contact={c} />
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#experience"
              className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/50 transition-transform hover:scale-[1.03]"
            >
              View experience
            </a>
            <a
              href="#skills"
              className="rounded-full border border-violet-500/30 px-6 py-3 text-sm font-semibold text-violet-300 transition-colors hover:bg-violet-500/10"
            >
              Explore skills
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-600/40 to-fuchsia-600/40 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-violet-400/20 bg-white/[0.03] p-2 backdrop-blur">
            <img
              src={resume.photo}
              alt={`Portrait of ${resume.name}`}
              fetchPriority="high"
              className="aspect-[4/5] w-full rounded-[1.35rem] object-cover"
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-16 w-full max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-violet-500/15 bg-violet-500/15 sm:grid-cols-4">
          {resume.stats.map((stat) => (
            <div key={stat.label} className="bg-[#0d0817] px-6 py-6 text-center">
              <div className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-3xl font-extrabold text-transparent">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-medium tracking-wide text-slate-400 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
