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
const thumbOf = (p) => (p.visual === "video" ? p.poster : p.image || p.logo);

// Accueil : index des projets. Au survol d'une ligne, un aperçu flotte et suit le curseur.
export function ProjectIndex() {
  const { t, tr } = useLang();
  const [hover, setHover] = useState(-1);
  const preview = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    const el = preview.current;
    if (!list || !el || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const p = { x: 0, y: 0 };
    const c = { x: 0, y: 0 };
    let raf = 0;
    const onMove = (e) => {
      const r = list.getBoundingClientRect();
      p.x = e.clientX - r.left;
      p.y = e.clientY - r.top;
    };
    const tick = () => {
      const dx = p.x - c.x;
      c.x += dx * 0.12;
      c.y += (p.y - c.y) * 0.12;
      el.style.transform = `translate(${c.x}px, ${c.y}px) translate(-50%, -50%) rotate(${Math.max(-8, Math.min(8, dx * 0.04))}deg)`;
      raf = requestAnimationFrame(tick);
    };
    list.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      list.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="work" className="sec">
      <SectionHead index={1} kicker={t.workKicker} title={t.workH} intro={t.workP}>
        <a className="btn line" href={withBase("/projets/")}>
          {t.allProjects.replace("{n}", projects.length)} <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </SectionHead>
      <div className="pindex-wrap" ref={listRef} onMouseLeave={() => setHover(-1)}>
      <ol className="pindex">
        {featured.map((p, i) => {
          const href = mainLink(p);
          return (
            <li key={p.key} className={hover === i ? "is-active" : ""} onMouseEnter={() => setHover(i)}>
              <a href={href} target="_blank" rel="noopener noreferrer" data-cursor="view">
                <span className="pi-num mono">{String(i + 1).padStart(2, "0")}</span>
                <img className="pi-thumb" src={withBase(thumbOf(p))} alt="" width="160" height="120" loading="lazy" />
                <span className="pi-title">{tr(p.title)}</span>
                <span className="pi-client">{p.client}</span>
                <span className="pi-cat mono">{t.filters[p.category]}</span>
                <span className="pi-arrow">
                  <ArrowUpRight size={22} aria-hidden="true" />
                </span>
                <span className="sr-only"> {t.newTab}</span>
              </a>
            </li>
          );
        })}
      </ol>
        <div className={hover >= 0 ? "pi-preview is-on" : "pi-preview"} ref={preview} aria-hidden="true">
          {featured.map((p, i) => (
            <img key={p.key} className={hover === i ? "is-on" : ""} src={withBase(thumbOf(p))} alt="" loading="lazy" width="640" height="480" />
          ))}
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
