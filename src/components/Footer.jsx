import { resume } from "../data/resume";

export default function Footer() {
  return (
    <footer className="relative border-t border-violet-500/10 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 text-center sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 text-xs font-extrabold text-white">
            {resume.name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </span>
          <p className="text-sm font-semibold text-white">{resume.name}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {resume.contacts
            .filter((c) => c.href)
            .map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-500 transition-colors hover:text-violet-300"
              >
                {c.label}
              </a>
            ))}
        </div>
        <p className="font-mono text-xs text-slate-600">
          © {new Date().getFullYear()} Khondekar Wamik Hossain · Built with React, Vite & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
