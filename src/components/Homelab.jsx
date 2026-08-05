import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import guideMarkdown from "../../PI-SERVER-SETUP-WEBSITE.md?raw";

function toText(node) {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(toText).join("");
  if (node && node.props) return toText(node.props.children);
  return "";
}

export default function Homelab() {
  const slugCounts = {};

  const makeHeading = (level) =>
    function Heading({ children }) {
      const Tag = `h${level}`;
      const base = toText(children).toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s/g, "-");
      const n = slugCounts[base] || 0;
      slugCounts[base] = n + 1;
      const id = n ? `${base}-${n}` : base;
      return <Tag id={id}>{children}</Tag>;
    };

  const components = {
    h1: makeHeading(1),
    h2: makeHeading(2),
    h3: makeHeading(3),
    h4: makeHeading(4),
    h5: makeHeading(5),
    h6: makeHeading(6),
    table: (props) => (
      <div className="overflow-x-auto">
        <table {...props} />
      </div>
    ),
    a: ({ href, children }) => {
      if (href?.startsWith("#")) {
        return (
          <a href={`#/homelab/${href.slice(1)}`} className="text-violet-300 underline decoration-violet-500/40 underline-offset-3 hover:text-violet-100">
            {children}
          </a>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-violet-300 underline decoration-violet-500/40 underline-offset-3 hover:text-violet-100"
        >
          {children}
        </a>
      );
    },
  };

  return (
    <>
      <div className="mx-auto max-w-4xl px-5 pt-24 sm:px-8">
        <a
          href="#/"
          className="inline-flex items-center gap-2 font-mono text-xs text-slate-400 transition-colors hover:text-violet-300"
        >
          <span aria-hidden>←</span> Back to portfolio
        </a>
        <div className="mt-8 mb-10">
          <p className="font-mono text-xs tracking-[0.3em] text-violet-400 uppercase">Homelab · Raspberry Pi 5</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Self-Hosting on a Raspberry Pi 5
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            A complete record of my home server build — every service, every container, every config.
          </p>
          <div className="mt-5 h-px w-24 bg-gradient-to-r from-violet-500 to-transparent" />
        </div>
      </div>
      <article className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        <div className="md-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {guideMarkdown}
          </ReactMarkdown>
        </div>
      </article>
    </>
  );
}
