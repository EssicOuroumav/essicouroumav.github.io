"use client";
import { ChevronRight, Globe, PlayCircle } from "lucide-react";
import { tints } from "../tints";
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

// Carte de projet façon « carte de destination » : visuel plein cadre, fondu teinté par la couleur
// dominante du projet, titre, ligne d'informations et bouton en verre ; liens secondaires en icônes.
export function GlassCard({ p, active = false }) {
  const { t, tr } = useLang();
  const title = tr(p.title);
  const main = p.links.site || p.links.figma || p.links.video || p.links.behance || p.links.github;
  const extras = [
    p.links.github && main !== p.links.github && { href: p.links.github, label: t.linkCode, icon: <BrandIcon name="github" size={16} color="currentColor" /> },
    p.links.figma && main !== p.links.figma && { href: p.links.figma, label: t.linkFigma, icon: <BrandIcon name="figma" size={16} color="currentColor" /> },
    p.links.behance && main !== p.links.behance && { href: p.links.behance, label: t.linkBehance, icon: <BrandIcon name="behance" size={16} color="currentColor" /> },
  ].filter(Boolean);
  return (
    <article className={active ? "gcard is-active" : "gcard"} style={{ "--tint": tints[p.key] || p.tint || "#3b2463" }}>
      <div className="gcard-media">
        <ProjectVisual p={p} title={title} hoverTarget=".gcard" />
      </div>
      <div className="gcard-fade" aria-hidden="true" />
      <div className="gcard-body">
        <h3>{title}</h3>
        <p>
          {p.client}
          <i className="dot-sep" aria-hidden="true" />
          {t.filters[p.category]}
        </p>
        <div className="gcard-actions">
          {main ? (
            <a className="gcard-btn" href={main} target="_blank" rel="noopener noreferrer" data-cursor="view">
              {t.open}
              <ChevronRight size={18} aria-hidden="true" />
              <span className="sr-only"> : {title} {t.newTab}</span>
            </a>
          ) : (
            <span className="gcard-btn is-muted">{t.soon}</span>
          )}
          {extras.map((l) => (
            <a key={l.href} className="gcard-icon" href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`${l.label} : ${title} ${t.newTab}`} title={l.label}>
              {l.icon}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
