"use client";
import { ArrowDownRight, ArrowUpRight, Mail, MapPin } from "lucide-react";
import { certifications, journey, profile, projects, services, tools } from "../data";
import { useLang } from "../i18n";
import { withBase } from "../base";
import { BrandIcon } from "./ui";

// En-tête de section : index mono « 01 / 05 », surtitre, grand titre, introduction.
export function SectionHead({ index, total = 5, kicker, title, intro, children }) {
  return (
    <div className="sec-head" data-reveal>
      <p className="kicker mono">
        <span>
          {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        {kicker}
      </p>
      <div className="sec-head-row">
        <h2>{title}</h2>
        {children}
      </div>
      {intro && <p className="sec-intro">{intro}</p>}
    </div>
  );
}

// Texte circulaire qui tourne lentement autour du badge.
function RotatingBadge({ text }) {
  const repeated = text.repeat(2);
  return (
    <div className="badge" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href="#badge-circle">{repeated}</textPath>
        </text>
      </svg>
      <span className="badge-core">
        <ArrowDownRight size={30} strokeWidth={1.6} />
      </span>
    </div>
  );
}

export function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy">
        <p className="kicker mono">
          <span>{t.edition} — {new Date().getFullYear()}</span>
          {profile.coords}
        </p>
        <h1 className="hero-title">
          <span className="sans">{t.heroFirst}</span>
          <span className="serif">{t.heroLast}</span>
        </h1>
        <p className="hero-role">{t.role}</p>
        <p className="hero-lead">{t.lead}</p>
        <div className="cta">
          <a className="btn primary" href={withBase("/projets/")}>
            {t.ctaWork} <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="btn ghost" href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
            <BrandIcon name="whatsapp" size={18} /> {t.ctaChat}
          </a>
        </div>
        <dl className="stats">
          <div>
            <dt>{t.stats[0]}</dt>
            <dd>
              <span data-count={profile.experienceYears}>{profile.experienceYears}</span>
            </dd>
          </div>
          <div>
            <dt>{t.stats[1]}</dt>
            <dd>
              <span data-count={projects.length}>{projects.length}</span>
            </dd>
          </div>
          <div>
            <dt>{t.stats[2]}</dt>
            <dd>
              <span data-count={services.length}>{services.length}</span>
            </dd>
          </div>
        </dl>
      </div>
      <div className="hero-visual">
        <div className="arch">
          <img src={withBase(profile.photo)} alt={profile.name} width="800" height="800" fetchPriority="high" />
        </div>
        <RotatingBadge text={t.badge} />
        <ul className="hero-tools" aria-label={t.toolsH}>
          {tools.map((tool) => (
            <li key={tool.key} title={tool.name}>
              <img src={withBase(tool.logo)} alt={tool.name} width="256" height="256" />
            </li>
          ))}
        </ul>
        <p className="hero-place mono">
          <MapPin size={14} aria-hidden="true" /> Abidjan, Côte d'Ivoire
        </p>
      </div>
    </section>
  );
}

export function Marquee() {
  const { tr } = useLang();
  const items = [...services, ...services];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {items.map((s, i) => (
              <span key={`${copy}-${i}`} className={i % 2 ? "serif" : "sans"}>
                {tr(s.title)}
                <i className="spark" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const { t, tr } = useLang();
  return (
    <section id="skills" className="sec">
      <SectionHead index={2} kicker={t.skillsKicker} title={t.skillsH} intro={t.skillsP} />
      <div className="skills">
        {services.map((s, i) => (
          <article key={s.key} className={`skill skill-${i + 1}`} data-reveal>
            <img src={withBase(s.image)} alt="" loading="lazy" width="1400" height="1094" />
            <div className="skill-body">
              <span className="mono skill-index">{String(i + 1).padStart(2, "0")}</span>
              <h3>{tr(s.title)}</h3>
              <p>{tr(s.desc)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Tools() {
  const { t, tr } = useLang();
  return (
    <section id="tools" className="sec">
      <SectionHead index={3} kicker={t.toolsKicker} title={t.toolsH} intro={t.toolsP} />
      <div className="tools">
        {tools.map((tool, i) => (
          <article key={tool.key} className="tool" data-reveal>
            <span className="mono tool-index">{String(i + 1).padStart(2, "0")}</span>
            <img src={withBase(tool.logo)} alt="" width="256" height="256" loading="lazy" />
            <h3>{tool.name}</h3>
            <p>{tr(tool.desc)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Journey() {
  const { t, tr } = useLang();
  return (
    <section id="journey" className="sec">
      <SectionHead index={4} kicker={t.jKicker} title={t.jH} intro={t.jP} />
      <div className="journey">
        <ol className="timeline">
          {journey.map((j, i) => (
            <li key={i} data-reveal>
              <span className="mono when">{tr(j.when)}</span>
              <div>
                <h3>{tr(j.title)}</h3>
                <p className="where">{tr(j.place)}</p>
                {tr(j.desc) && <p className="what">{tr(j.desc)}</p>}
              </div>
            </li>
          ))}
        </ol>
        <aside className="certs" data-reveal>
          <h3 className="mono">{t.certH}</h3>
          <ul>
            {certifications.map((c, i) => (
              <li key={i}>{tr(c)}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useLang();
  return (
    <section id="contact" className="sec">
      <div className="contact" data-reveal>
        <p className="kicker mono light">
          <span>05 / 05</span>
          {t.ctaKicker}
        </p>
        <h2>
          <span className="sans">{t.ctaH1}</span> <span className="serif">{t.ctaH2}</span>
        </h2>
        <p className="contact-p">{t.ctaP}</p>
        <div className="cta">
          <a className="btn cream" href={`mailto:${profile.email}`}>
            <Mail size={18} aria-hidden="true" /> {t.mail}
          </a>
          <a className="btn outline" href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
            <BrandIcon name="whatsapp" size={18} color="currentColor" /> WhatsApp
          </a>
          <a className="btn outline" href={profile.behance} target="_blank" rel="noopener noreferrer">
            <BrandIcon name="behance" size={18} color="currentColor" /> Behance
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="foot">
      <div className="foot-big" aria-hidden="true">
        <span className="sans">Cisse</span> <span className="serif">Vamourou</span>
      </div>
      <div className="foot-cols">
        <div>
          <h3 className="mono">{t.footContact}</h3>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
            {profile.whatsappLabel}
          </a>
        </div>
        <div>
          <h3 className="mono">{t.footSocial}</h3>
          <a href={profile.behance} target="_blank" rel="noopener noreferrer">
            Behance
          </a>
          <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
        <div>
          <h3 className="mono">{t.footLinks}</h3>
          <a href={withBase("/")}>{t.nav[0]}</a>
          <a href={withBase("/projets/")}>{t.nav[1]}</a>
          <a href={withBase("/mentions-legales/")}>{t.legal}</a>
        </div>
      </div>
      <p className="foot-legal mono">
        © {new Date().getFullYear()} {profile.name} · Abidjan, Côte d'Ivoire
      </p>
    </footer>
  );
}
