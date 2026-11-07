"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { categories, projects } from "../data";
import { useLang } from "../i18n";
import { withBase } from "../base";
import { ProjectLinks, ProjectVisual } from "./ProjectCard";
import { SectionHead } from "./Sections";

const featured = projects.filter((p) => p.featured);
const mainLink = (p) => p.links.site || p.links.figma || p.links.video || p.links.behance || p.links.github;

// Accueil : galerie de projets. Sur ordinateur, la section reste fixe et les cartes défilent
// horizontalement au rythme du défilement vertical ; sur mobile, glissement horizontal natif.
export function ProjectShowcase() {
  const { t, tr } = useLang();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const desktop = matchMedia("(min-width: 901px)");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let distance = 0;

    const measure = () => {
      const on = desktop.matches && !reduce;
      setPinned(on);
      if (!on) {
        section.style.height = "";
        track.style.transform = "";
        return;
      }
      distance = Math.max(0, track.scrollWidth - window.innerWidth + 48);
      section.style.height = `${window.innerHeight + distance}px`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!desktop.matches || reduce) return;
        const r = section.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -r.top / Math.max(1, distance)));
        track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
        if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
        setActive(Math.min(featured.length - 1, Math.round(progress * (featured.length - 1))));
      });
    };

    measure();
    onScroll();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    desktop.addEventListener("change", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      desktop.removeEventListener("change", measure);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="work" className={pinned ? "showcase is-pinned" : "showcase"} ref={sectionRef}>
      <div className="showcase-sticky">
        <div className="showcase-head">
          <SectionHead index={1} kicker={t.workKicker} title={t.workH} intro={t.workP}>
            <a className="btn line" href={withBase("/projets/")}>
              {t.allProjects.replace("{n}", projects.length)} <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </SectionHead>
        </div>
        <div className="showcase-track" ref={trackRef}>
          {featured.map((p, i) => {
            const title = tr(p.title);
            const href = mainLink(p);
            return (
              <article key={p.key} className={active === i ? "sc-card is-active" : "sc-card"}>
                <div className="sc-media">
                  <ProjectVisual p={p} title={title} hoverTarget=".sc-card" />
                  {href && (
                    <a className="tile-hit" href={href} target="_blank" rel="noopener noreferrer" data-cursor="view" aria-label={`${t.open} : ${title} ${t.newTab}`} />
                  )}
                </div>
                <div className="sc-caption glass">
                  <span className="sc-num mono">{String(i + 1).padStart(2, "0")}</span>
                  <div className="sc-text">
                    <p className="mono">
                      {p.client} · {t.filters[p.category]}
                    </p>
                    <h3>{title}</h3>
                  </div>
                  <ProjectLinks links={p.links} />
                </div>
              </article>
            );
          })}
        </div>
        <div className="showcase-progress" aria-hidden="true">
          <span className="mono">
            {String(active + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
          </span>
          <i>
            <b ref={barRef} />
          </i>
        </div>
      </div>
    </section>
  );
}

// Page Projets : filtres + grille éditoriale (tailles alternées), vidéos lues au survol.
const used = categories.filter((c) => projects.some((p) => p.category === c));
// Motif de largeurs (sur 12 colonnes) répété le long de la grille.
const pattern = [7, 5, 4, 4, 4, 5, 7, 6, 6];

export function ProjectsGrid() {
  const { t, tr } = useLang();
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
      <div className="bento">
        {shown.map((p, i) => {
          const title = tr(p.title);
          const href = mainLink(p);
          const span = pattern[i % pattern.length];
          return (
            <article key={p.key} className={`tile span-${span}`}>
              <div className="tile-media">
                <ProjectVisual p={p} title={title} hoverTarget=".tile" />
                {href && (
                  <a className="tile-hit" href={href} target="_blank" rel="noopener noreferrer" data-cursor="view" aria-label={`${t.open} : ${title} ${t.newTab}`} />
                )}
                <span className="tile-num mono">{String(projects.indexOf(p) + 1).padStart(2, "0")}</span>
              </div>
              <div className="tile-caption">
                <div>
                  <p className="tile-meta mono">
                    {p.client} · {t.filters[p.category]}
                  </p>
                  <h3>{title}</h3>
                  <p className="tile-desc">{tr(p.desc)}</p>
                </div>
                <ProjectLinks links={p.links} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
