import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Summary from "./components/Summary";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Homelab from "./components/Homelab";
import SiteBuild from "./components/SiteBuild";
import Footer from "./components/Footer";

const pages = {
  homelab: Homelab,
  site: SiteBuild,
};

function parseRoute(hash) {
  for (const page of Object.keys(pages)) {
    const prefix = `#/${page}`;
    if (hash.startsWith(prefix)) {
      const anchor = hash.slice(prefix.length).replace(/^\/+/, "");
      return { page, anchor: anchor || null };
    }
  }
  const rest = hash.slice(1);
  return { page: "home", anchor: rest && rest !== "/" ? rest : null };
}

export default function App() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));
  const prevPage = useRef(route.page);

  useEffect(() => {
    const onHashChange = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (route.page === "home" && prevPage.current === "home") {
      return;
    }
    if (route.anchor) {
      requestAnimationFrame(() => {
        document.getElementById(route.anchor)?.scrollIntoView();
      });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [route]);

  useEffect(() => {
    prevPage.current = route.page;
  }, [route]);

  if (route.page !== "home") {
    const Page = pages[route.page];
    return (
      <div className="relative min-h-screen overflow-x-hidden">
        <Navbar active={route.page} />
        <Page />
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Summary />
        <Skills />
        <Experience />
        <Certifications />
        <Education />
      </main>
      <Footer />
    </div>
  );
}
