export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-10">
      <p className="font-mono text-xs tracking-[0.3em] text-violet-400 uppercase">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">{subtitle}</p>}
      <div className="mt-5 h-px w-24 bg-gradient-to-r from-violet-500 to-transparent" />
    </div>
  );
}
