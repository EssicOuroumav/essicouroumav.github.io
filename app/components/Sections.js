"use client";
import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, X } from "lucide-react";
import { certifications, journey, profile, projects, services, tools } from "../data";
import { useLang } from "../i18n";
import { BrandIcon } from "./ui";

const years = new Date().getFullYear() - profile.since;

export function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="hero">
      <div className="hero-text">
        <p className="status">
          <i aria-hidden="true" /> {t.status}
        </p>
        <h1>
          <span className="hero-name">{profile.name}</span>
          <span className="hero-role">{t.role}</span>
        </h1>
        <p className="lead">{t.lead}</p>
        <div className="cta">
          <a className="btn solid" href="#work">
            {t.ctaWork} <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="btn" href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
            <BrandIcon name="whatsapp" size={18} /> {t.ctaChat}
          </a>
        </div>
        <dl className="stats">
          <div>
            <dt>{t.stats[0]}</dt>
            <dd data-count={projects.length}>{projects.length}</dd>
          </div>
          <div>
            <dt>{t.stats[1]}</dt>
            <dd data-count={years}>{years}</dd>
          </div>
          <div>
            <dt>{t.stats[2]}</dt>
            <dd data-count={services.length}>{services.length}</dd>
          </div>
        </dl>
      </div>
      <div className="hero-photo">
        <div className="photo">
          <img src={profile.photo} alt={profile.name} width="800" height="800" fetchPriority="high" />
        </div>
        {tools.map((tool, i) => (
          <span key={tool.key} className={`float f${i + 1}`} title={tool.name}>
            <BrandIcon name={tool.key} size={28} />
          </span>
        ))}
        <p className="place">
          <MapPin size={16} aria-hidden="true" /> {t.location}
        </p>
      </div>
    </section>
  );
}

export function ToolStrip() {
  const items = [...tools, ...tools, ...tools];
  return (
    <div className="strip" aria-hidden="true">
      <div className="strip-track">
        {[0, 1].map((copy) => (
          <div className="strip-group" key={copy}>
            {items.map((tool, i) => (
              <span key={`${copy}-${i}`}>
                <BrandIcon name={tool.key} size={22} /> {tool.name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Services() {
  const { t, tr } = useLang();
  const [open, setOpen] = useState(1);
  return (
    <section id="services" className="sec">
      <div className="head" data-reveal>
        <h2>{t.svcH}</h2>
        <p>{t.svcP}</p>
      </div>
      <ul className="svc-list">
        {services.map((s, i) => {
          const isOpen = open === i;
          return (
            <li key={s.key} className={isOpen ? "svc open" : "svc"}>
              <button
                type="button"
                className="svc-head"
                aria-expanded={isOpen}
                aria-controls={`svc-${s.key}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="svc-title">{tr(s.title)}</span>
                <span className="svc-ico" aria-hidden="true">
                  {isOpen ? <X size={30} strokeWidth={1.5} /> : <ArrowUpRight size={30} strokeWidth={1.5} />}
                </span>
                <span className="sr-only">{isOpen ? t.close : t.open}</span>
              </button>
              <div className="svc-body" id={`svc-${s.key}`} hidden={!isOpen}>
                <p>{tr(s.desc)}</p>
                <img src={s.image} alt="" loading="lazy" width="1400" height="1094" />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Tools() {
  const { t, tr } = useLang();
  return (
    <section id="tools" className="sec">
      <div className="head" data-reveal>
        <h2>{t.toolsH}</h2>
        <p>{t.toolsP}</p>
      </div>
      <div className="tool-grid">
        {tools.map((tool) => (
          <article key={tool.key} className="tool" data-reveal>
            <span className="tool-logo">
              <BrandIcon name={tool.key} size={40} />
            </span>
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
      <div className="head" data-reveal>
        <h2>{t.jH}</h2>
        <p>{t.jP}</p>
      </div>
      <div className="journey">
        <ol className="timeline">
          {journey.map((j, i) => (
            <li key={i} data-reveal>
              <span className="when">{tr(j.when)}</span>
              <h3>{tr(j.title)}</h3>
              <p className="where">{tr(j.place)}</p>
              {tr(j.desc) && <p>{tr(j.desc)}</p>}
            </li>
          ))}
        </ol>
        <aside className="certs" data-reveal>
          <h3>{t.certH}</h3>
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
    <section id="contact" className="sec contact">
      <div className="contact-card" data-reveal>
        <p className="status">
          <i aria-hidden="true" /> {t.status}
        </p>
        <h2>{t.ctaH}</h2>
        <p>{t.ctaP}</p>
        <div className="cta">
          <a className="btn solid" href={`mailto:${profile.email}`}>
            <Mail size={18} aria-hidden="true" /> {t.mail}
          </a>
          <a className="btn" href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
            <BrandIcon name="whatsapp" size={18} /> WhatsApp
          </a>
          <a className="btn" href={profile.behance} target="_blank" rel="noopener noreferrer">
            <BrandIcon name="behance" size={18} /> Behance
          </a>
        </div>
        <p className="contact-lines">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
            {profile.whatsappLabel}
          </a>
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="foot">
      <span>
        © {new Date().getFullYear()} {profile.name} · {t.location}
      </span>
      <a href="/mentions-legales/">{t.legal}</a>
    </footer>
  );
}
