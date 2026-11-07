"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { categories, projects } from "../data";
import { useLang } from "../i18n";
import { withBase } from "../base";
import { GlassCard } from "./ProjectCard";
import { SectionHead } from "./Sections";

const featured = projects.filter((p) => p.featured);

// Accueil : carrousel de cartes. La carte la plus proche du centre est surélevée et agrandie.
export function ProjectCarousel() {
  const { t } = useLang();
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const update = () => {
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let dist = Infinity;
      [...track.children].forEach((el, i) => {
        const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    // Démarre sur la deuxième carte pour montrer d'emblée une carte de chaque côté.
    const start = track.children[1];
    if (start) track.scrollLeft = start.offsetLeft + start.offsetWidth / 2 - track.clientWidth / 2;
    update();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = (dir) => {
    const track = trackRef.current;
    const next = track?.children[Math.max(0, Math.min(featured.length - 1, active + dir))];
    if (next) track.scrollTo({ left: next.offsetLeft + next.offsetWidth / 2 - track.clientWidth / 2, behavior: "smooth" });
  };

  return (
    <section id="work" className="sec">
      <SectionHead index={1} kicker={t.workKicker} title={t.workH} intro={t.workP}>
        <a className="btn line" href={withBase("/projets/")}>
          {t.allProjects.replace("{n}", projects.length)} <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </SectionHead>
      <div className="carousel">
        <div className="carousel-track" ref={trackRef}>
          {featured.map((p, i) => (
            <div key={p.key} className="carousel-slide">
              <GlassCard p={p} active={active === i} />
            </div>
          ))}
        </div>
        <div className="carousel-nav">
          <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label={t.prev} disabled={active === 0}>
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <span className="mono">
            {String(active + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
          </span>
          <button type="button" className="icon-btn" onClick={() => go(1)} aria-label={t.next} disabled={active === featured.length - 1}>
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

// Page Projets : filtres + grille de cartes.
const used = categories.filter((c) => projects.some((p) => p.category === c));

export function ProjectsGrid() {
  const { t } = useLang();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.replace("#", "");
      if (used.includes(h)) setFilter(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  return (
    <section className="sec projects-page">
      <div className="pp-head">
        <p className="kicker mono">
          <span>({String(projects.length).padStart(2, "0")})</span>
          {t.workKicker}
        </p>
        <h1 className="pp-title">{t.workH}</h1>
        <p className="sec-intro">{t.projectsIntro}</p>
      </div>
      <div className="filters" role="group" aria-label={t.filtersLabel}>
        {["all", ...used].map((c) => {
          const count = c === "all" ? projects.length : projects.filter((p) => p.category === c).length;
          return (
            <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {t.filters[c]} <span className="mono">{count}</span>
            </button>
          );
        })}
      </div>
      <div className="cards-grid">
        {shown.map((p) => (
          <GlassCard key={p.key} p={p} />
        ))}
      </div>
    </section>
  );
}
