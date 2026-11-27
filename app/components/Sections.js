"use client";
import { ArrowRight, Mail } from "lucide-react";

// Où mène chaque carte Compétences.
const skillHref = { graphic: "/design-graphique/", uiux: "/projets/#uiux", web: "/projets/#web", motion: "/projets/#motion" };
import { certifications, journey, profile, services, tools } from "../data";
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

export function Marquee() {
  const { tr } = useLang();
  const items = [...services, ...services];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {items.map((s, i) => (
              <span key={`${copy}-${i}`} className={i % 2 ? "outline" : ""}>
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
        {services.map((s, i) => {
          const href = withBase(skillHref[s.key] || "/projets/");
          return (
            <article key={s.key} className={`pcard skill skill-${i + 1}`} data-reveal>
              <a className="pcard-media skill-media" href={href} data-cursor="view" tabIndex={-1} aria-hidden="true">
                <img src={withBase(s.image)} alt="" loading="lazy" width="1400" height="1094" />
              </a>
              <div className="pcard-body">
                <p className="pcard-meta">
                  <span className="pcard-chip mono">{String(i + 1).padStart(2, "0")}</span>
                </p>
                <h3>
                  <a href={href}>{tr(s.title)}</a>
                </h3>
                <p className="pcard-desc">{tr(s.desc)}</p>
                <div className="pcard-actions">
                  <a className="pcard-btn ghost" href={href}>
                    {t.skillMore} <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
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
          <span>{t.ctaH1}</span> <span className="accent">{t.ctaH2}</span>
        </h2>
        <p className="contact-p">{t.ctaP}</p>
        <div className="hero-cta">
          <a className="btn yellow" href={`mailto:${profile.email}`}>
            <Mail size={18} aria-hidden="true" /> {t.mail}
          </a>
          <a className="btn glass" href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
            <BrandIcon name="whatsapp" size={18} color="currentColor" /> WhatsApp
          </a>
          <a className="btn glass" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <BrandIcon name="linkedin" size={18} color="currentColor" /> LinkedIn
          </a>
          <a className="btn glass" href={profile.behance} target="_blank" rel="noopener noreferrer">
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
        Cisse <span>Vamourou</span>
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
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={profile.civart} target="_blank" rel="noopener noreferrer">
            Civ&apos;Art
          </a>
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
