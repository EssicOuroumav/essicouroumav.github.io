"use client";
import { ArrowUpRight, Globe, PlayCircle } from "lucide-react";
import { useLang } from "../i18n";
import { withBase } from "../base";
import { BrandIcon, LoopVideo } from "./ui";

const host = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

// Visuel d'un projet selon son type (capture dans un navigateur, image, logo de marque ou vidéo).
export function ProjectVisual({ p, title, hoverTarget }) {
  if (p.visual === "video") {
    return (
      <div className="pv pv-video">
        <LoopVideo src={withBase(p.video)} poster={withBase(p.poster)} hoverTarget={hoverTarget} />
      </div>
    );
  }
  if (p.visual === "browser") {
    return (
      <div className="pv pv-browser">
        <div className="browser">
          <div className="browser-bar">
            <i />
            <i />
            <i />
            <span className="mono">{p.links.site ? host(p.links.site) : title}</span>
          </div>
          <img src={withBase(p.image)} alt={title} loading="lazy" width="1400" height="875" />
        </div>
      </div>
    );
  }
  if (p.visual === "brand") {
    return (
      <div className="pv pv-brand" style={{ "--tint": p.tint }}>
        <img src={withBase(p.logo)} alt={`Logo ${title}`} loading="lazy" width="400" height="400" />
      </div>
    );
  }
  return (
    <div className="pv pv-image">
      <img src={withBase(p.image)} alt={title} loading="lazy" width="1400" height="1094" />
    </div>
  );
}

export function ProjectLinks({ links }) {
  const { t } = useLang();
  const items = [
    links.site && { href: links.site, label: t.linkSite, icon: <Globe size={15} aria-hidden="true" /> },
    links.figma && { href: links.figma, label: t.linkFigma, icon: <BrandIcon name="figma" size={15} color="currentColor" /> },
    links.video && { href: links.video, label: t.linkVideo, icon: <PlayCircle size={15} aria-hidden="true" /> },
    links.behance && { href: links.behance, label: t.linkBehance, icon: <BrandIcon name="behance" size={15} color="currentColor" /> },
    links.github && { href: links.github, label: t.linkCode, icon: <BrandIcon name="github" size={15} color="currentColor" /> },
  ].filter(Boolean);
  if (!items.length) return <p className="links-soon mono">{t.soon}</p>;
  return (
    <div className="links">
      {items.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
          {l.icon} {l.label}
          <span className="sr-only"> {t.newTab}</span>
        </a>
      ))}
    </div>
  );
}

// Carte portrait de la page Projets.
export default function ProjectCard({ p, index }) {
  const { t, tr } = useLang();
  const title = tr(p.title);
  const main = p.links.site || p.links.figma || p.links.video || p.links.behance || p.links.github;
  return (
    <article className="pcard" data-reveal>
      <div className="pcard-media">
        <ProjectVisual p={p} title={title} hoverTarget=".pcard" />
        <span className="pcard-cat">{t.filters[p.category]}</span>
        <span className="pcard-index mono">{String(index + 1).padStart(2, "0")}</span>
        <div className="pcard-overlay">
          <h3>{title}</h3>
          {main && (
            <a className="pcard-go" href={main} target="_blank" rel="noopener noreferrer" aria-label={`${t.open} : ${title} ${t.newTab}`}>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
      <div className="pcard-body">
        <p className="pcard-desc">{tr(p.desc)}</p>
        <ul className="pcard-tags mono">
          {p.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <ProjectLinks links={p.links} />
      </div>
    </article>
  );
}
