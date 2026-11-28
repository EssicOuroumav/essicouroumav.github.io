"use client";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { projects, stories } from "../data";
import { caseStudies } from "../stories";
import { tints } from "../tints";
import { useLang } from "../i18n";
import { withBase } from "../base";
import { GlassCard, ProjectVisual, projectLinks } from "./ProjectCard";

// Page détail d'un projet : en-tête, grand visuel, outils, liens, récit (défi / réponse / résultat)
// quand il existe, puis trois autres projets de la même catégorie.
export default function ProjectDetail({ slug }) {
  const { t, tr } = useLang();
  const p = projects.find((x) => x.key === slug);
  const title = tr(p.title);
  const links = projectLinks(p, t, title);
  const story = stories[p.key];
  const study = caseStudies[p.key];
  const others = [...projects.filter((x) => x.category === p.category && x.key !== p.key), ...projects.filter((x) => x.category !== p.category)].slice(0, 3);

  return (
    <article className="sec pd">
      <a className="pd-back" href={withBase("/projets/")}>
        <ArrowLeft size={16} aria-hidden="true" /> {t.backProjects}
      </a>
      <p className="pcard-meta pd-meta">
        <span className="pcard-chip">{t.filters[p.category]}</span>
        <span>{tr(p.client)}</span>
      </p>
      <h1 className="pd-title">{title}</h1>
      {study && <p className="pd-tagline">{tr(study.tagline)}</p>}
      <p className="pd-lead">{tr(p.desc)}</p>

      <div className="pd-grid">
        <div className="pd-media" style={{ "--tint": tints[p.key] || p.tint || "#3b2463" }}>
          <ProjectVisual p={p} title={title} eager />
        </div>
        <aside className="pd-side">
          {study && (
            <dl className="pd-facts">
              {[
                [t.factRole, tr(study.facts.role)],
                [t.factYear, study.facts.year],
                [t.factStatus, tr(study.facts.status)],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          )}
          <h2>{t.toolsUsed}</h2>
          <ul className="pcard-tags">
            {p.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <h2>{t.projectLinks}</h2>
          {links.length ? (
            <div className="pd-links">
              {links.map((l) => (
                <a key={l.href} className="pcard-btn ghost" href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.icon} {l.label} <ArrowUpRight size={15} aria-hidden="true" />
                  <span className="sr-only"> {t.newTab}</span>
                </a>
              ))}
            </div>
          ) : (
            <p className="pd-soon">{t.soon}</p>
          )}
        </aside>
      </div>

      {study && (
        <section className="pd-story" aria-labelledby="pd-case-title">
          <p className="kicker mono">{t.caseKicker}</p>
          <h2 id="pd-case-title">{t.caseTitle}</h2>
          <ol className="pd-chapters">
            {study.chapters.map((c, i) => (
              <li key={c.h.fr}>
                <span className="mono" aria-hidden="true">0{i + 1}</span>
                <h3>{tr(c.h)}</h3>
                <p>{tr(c.p)}</p>
              </li>
            ))}
          </ol>
          <h3 className="pd-feat-title">{t.caseFeatures}</h3>
          <ul className="pd-feats">
            {study.features.map((f) => (
              <li key={f.fr}>
                <Check size={18} aria-hidden="true" /> {tr(f)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {story && (
        <section className="pd-story" aria-labelledby="pd-story-title">
          <p className="kicker mono">{t.storyKicker}</p>
          <h2 id="pd-story-title">{t.storyTitle}</h2>
          <div className="pd-story-grid">
            {[
              ["challenge", t.challenge],
              ["response", t.response],
              ["result", t.result],
            ].map(([k, label], i) => (
              <div key={k} className="pd-step">
                <span className="mono">0{i + 1}</span>
                <h3>{label}</h3>
                <p>{tr(story[k])}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="pd-more" aria-labelledby="pd-more-title">
        <h2 id="pd-more-title">{t.moreProjects}</h2>
        <div className="cards-grid">
          {others.map((o) => (
            <GlassCard key={o.key} p={o} />
          ))}
        </div>
      </section>
    </article>
  );
}
