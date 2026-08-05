import { useEffect, useState } from "react";
import { resume } from "../data/resume";
import { contactEmailHref } from "../utils/contact";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Education", href: "#education" },
  { label: "Homelab", href: "#/homelab", page: "homelab" },
];

export default function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = resume.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-violet-500/10 bg-[#0a0611]/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 font-extrabold text-white shadow-lg shadow-violet-900/50">
            {initials}
          </span>
          <span className="hidden text-sm font-semibold tracking-wide text-slate-200 sm:block">
            {resume.name}
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-violet-300 ${
                active === link.page ? "text-violet-300" : "text-slate-400"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={contactEmailHref("wamik25apr@gmail.com")}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-violet-500/40 px-4 py-1.5 text-sm font-semibold text-violet-300 transition-all hover:bg-violet-600 hover:text-white"
          >
            Hire me
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-violet-500/20 text-violet-300 md:hidden"
        >
          <span className={`h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-violet-500/10 bg-[#0d0817]/95 px-5 pb-6 pt-3 backdrop-blur-xl md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-violet-500/10 hover:text-violet-300 ${
                active === link.page ? "bg-violet-500/10 text-violet-300" : "text-slate-300"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href={contactEmailHref("wamik25apr@gmail.com")}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block rounded-full bg-violet-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
          >
            Hire me
          </a>
        </div>
      )}
    </header>
  );
}
