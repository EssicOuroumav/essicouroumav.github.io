"use client";
import { useState } from "react";
import { ArrowUpRight, Globe, PlayCircle } from "lucide-react";
import { categories, profile, projects } from "../data";
import { useLang } from "../i18n";
import { withBase } from "../base";
import { BrandIcon } from "./ui";

// N'affiche que les filtres qui ont au moins un projet.
const usedCategories = categories.filter((c) => projects.some((p) => p.category === c));

function ProjectLinks({ links, t }) {
  const items = [
    links.site && { href: links.site, label: t.linkSite, icon: <Globe size={16} aria-hidden="true" /> },
    links.github && { href: links.github, label: t.linkCode, icon: <BrandIcon name="github" size={16} color="currentColor" /> },
    links.behance && { href: links.behance, label: t.linkBehance, icon: <BrandIcon name="behance" size={16} color="currentColor" /> },
    links.video && { href: links.video, label: t.linkVideo, icon: <PlayCircle size={16} aria-hidden="true" /> },
  ].filter(Boolean);

  if (!items.length) return <p className="card-soon">{t.soon}</p>;
  return (
    <div className="card-links">
      {items.map((l) => (
        <a key={l.href} className="chip link" href={l.href} target="_blank" rel="noopener noreferrer">
          {l.icon} {l.label}
          <span className="sr-only"> {t.newTab}</span>
        </a>
      ))}
    </div>
  );
}

function Card({ p }) {
  const { t, tr } = useLang();
  const title = tr(p.title);
  const main = p.links.site || p.links.behance || p.links.video || p.links.github;
  const visual =
    p.visual === "logo" ? (
      <div className="card-media logo" style={{ "--tint": p.tint }}>
        <img src={withBase(p.logo)} alt={`Logo ${title}`} loading="lazy" width="400" height="400" />
      </div>
    ) : (
      <div className="card-media">
        <img src={withBase(p.image)} alt={title} loading="lazy" width="1400" height="1094" />
        {p.logo && (
          <span className="card-logo">
            <img src={withBase(p.logo)} alt="" width="400" height="400" loading="lazy" />
          </span>
        )}
      </div>
    );

  return (
    <article className="card" data-reveal>
      {main ? (
        <a className="card-visual" href={main} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
          {visual}
          <span className="card-arrow">
            <ArrowUpRight size={22} />
          </span>
        </a>
      ) : (
        <div className="card-visual">{visual}</div>
      )}
      <div className="card-body">
        <p className="card-cat">{t.filters[p.category]}</p>
        <h3>{title}</h3>
        <p className="card-desc">{tr(p.desc)}</p>
        <ul className="tags">
          {p.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
        <ProjectLinks links={p.links} t={t} />
      </div>
    </article>
  );
}

export default function Work() {
  const { t } = useLang();
  const [filter, setFilter] = useState("all");
  const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="sec work">
      <div className="work-panel">
        <div className="work-head" data-reveal>
          <span className="watermark" aria-hidden="true">
            {t.watermark}
          </span>
          <h2>{t.workH}</h2>
          <p>{t.workP}</p>
        </div>
        <div className="work-bar">
          <div className="filters" role="group" aria-label={t.nav[1]}>
            {["all", ...usedCategories].map((c) => (
              <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
                {t.filters[c]}
              </button>
            ))}
          </div>
          <a className="btn sm" href={profile.behance} target="_blank" rel="noopener noreferrer">
            {t.allBehance} <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="grid">
          {shown.map((p) => (
            <Card key={p.key} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
