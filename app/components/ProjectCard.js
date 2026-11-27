"use client";
import { ArrowRight, ArrowUpRight, Globe, MessageCircle, PlayCircle } from "lucide-react";
import { tints } from "../tints";
import { profile } from "../data";
import { useLang } from "../i18n";
import { withBase } from "../base";
import { BrandIcon, LoopVideo } from "./ui";

const host = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

export const detailHref = (p) => withBase(`/projets/${p.key}/`);

// Visuel d'un projet selon son type (capture dans un navigateur, image, logo de marque ou vidéo).
export function ProjectVisual({ p, title, hoverTarget, eager = false }) {
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
          <img src={withBase(p.image)} alt={title} loading={eager ? "eager" : "lazy"} width="1400" height="875" />
        </div>
      </div>
    );
  }
  if (p.visual === "brand") {
    return (
      <div className="pv pv-brand" style={{ "--tint": p.tint }}>
        <img src={withBase(p.logo)} alt={`Logo ${title}`} loading={eager ? "eager" : "lazy"} width="400" height="400" />
      </div>
    );
  }
  return (
    <div className="pv pv-image">
      <img src={withBase(p.image)} alt={title} loading={eager ? "eager" : "lazy"} width="1400" height="1094" />
    </div>
  );
}

// Tous les liens externes d'un projet, dans l'ordre de priorité (le premier est le lien principal).
export function projectLinks(p, t, title) {
  const demo = p.demo ? `${profile.whatsapp}?text=${encodeURIComponent(t.demoMsg.replace("{p}", title))}` : null;
  return [
    p.links.site && { href: p.links.site, label: t.linkSite, icon: <Globe size={16} aria-hidden="true" /> },
    p.links.video && { href: p.links.video, label: t.linkVideo, icon: <PlayCircle size={16} aria-hidden="true" /> },
    p.links.behance && { href: p.links.behance, label: t.linkBehance, icon: <BrandIcon name="behance" size={16} color="currentColor" /> },
    p.links.figma && { href: p.links.figma, label: t.linkFigma, icon: <BrandIcon name="figma" size={16} color="currentColor" /> },
    p.links.github && { href: p.links.github, label: t.linkCode, icon: <BrandIcon name="github" size={16} color="currentColor" /> },
    demo && { href: demo, label: t.demo, icon: <MessageCircle size={16} aria-hidden="true" /> },
  ].filter(Boolean);
}

// Carte de projet : capture dégagée en haut, informations sur fond clair en dessous
// (catégorie, client, titre, description, outils, page détail + lien principal).
export function GlassCard({ p, active = false }) {
  const { t, tr } = useLang();
  const title = tr(p.title);
  const links = projectLinks(p, t, title);
  const main = links[0];
  return (
    <article className={active ? "pcard is-active" : "pcard"} style={{ "--tint": tints[p.key] || p.tint || "#3b2463" }}>
      <a className="pcard-media" href={detailHref(p)} data-cursor="view" aria-label={`${t.viewDetails} : ${title}`}>
        <ProjectVisual p={p} title={title} hoverTarget=".pcard" />
      </a>
      <div className="pcard-body">
        <p className="pcard-meta">
          <span className="pcard-chip">{t.filters[p.category]}</span>
          <span>{tr(p.client)}</span>
        </p>
        <h3>
          <a href={detailHref(p)}>{title}</a>
        </h3>
        <p className="pcard-desc">{tr(p.desc)}</p>
        <ul className="pcard-tags">
          {p.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="pcard-actions">
          <a className="pcard-btn" href={detailHref(p)}>
            {t.viewDetails} <ArrowRight size={16} aria-hidden="true" />
          </a>
          {main ? (
            <a className="pcard-btn ghost" href={main.href} target="_blank" rel="noopener noreferrer">
              {main.label} <ArrowUpRight size={16} aria-hidden="true" />
              <span className="sr-only"> : {title} {t.newTab}</span>
            </a>
          ) : (
            <span className="pcard-btn ghost is-muted">{t.soon}</span>
          )}
        </div>
      </div>
    </article>
  );
}
