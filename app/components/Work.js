"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { categories, projects } from "../data";
import { useLang } from "../i18n";
import { withBase } from "../base";
import ProjectCard, { ProjectLinks, ProjectVisual } from "./ProjectCard";
import { SectionHead } from "./Sections";

const featured = projects.filter((p) => p.featured).slice(0, 6);

// Accueil : volets de projets. Le volet actif s'élargit (survol, focus ou clic) ; empilés sur mobile.
export function Featured() {
  const { t, tr } = useLang();
  const [active, setActive] = useState(0);
  return (
    <section id="work" className="sec">
      <SectionHead index={1} kicker={t.workKicker} title={t.workH} intro={t.workP}>
        <a className="btn ghost" href={withBase("/projets/")}>
          {t.allProjects} <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </SectionHead>
      <div className="panels" data-reveal>
        {featured.map((p, i) => {
          const title = tr(p.title);
          const isOpen = active === i;
          return (
            <article
              key={p.key}
              className={isOpen ? "panel open" : "panel"}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <button type="button" className="panel-tab" aria-expanded={isOpen} onClick={() => setActive(i)}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="panel-title">{title}</span>
              </button>
              <div className="panel-content" aria-hidden={!isOpen}>
                <ProjectVisual p={p} title={title} hoverTarget=".panel" />
                <div className="panel-info">
                  <span className="pcard-cat">{t.filters[p.category]}</span>
                  <h3>{title}</h3>
                  <p>{tr(p.desc)}</p>
                  {isOpen && <ProjectLinks links={p.links} />}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

// Page Projets : filtres + grille de cartes portrait.
const used = categories.filter((c) => projects.some((p) => p.category === c));

export function ProjectsGrid() {
  const { t } = useLang();
  const [filter, setFilter] = useState("all");
  const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  return (
    <section className="sec projects-page">
      <div className="pp-head">
        <p className="kicker mono">
          <span>({String(projects.length).padStart(2, "0")})</span>
          {t.workKicker}
        </p>
        <h1 className="pp-title">
          <span className="sans">{t.workH}</span>
          <span className="serif">.</span>
        </h1>
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
      <div className="pgrid">
        {shown.map((p) => (
          <ProjectCard key={p.key} p={p} index={projects.indexOf(p)} />
        ))}
      </div>
    </section>
  );
}
