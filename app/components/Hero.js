"use client";
import { useEffect, useRef } from "react";
import { ArrowRight, Clapperboard, Code2, PenTool, Sparkles } from "lucide-react";
import { profile, projects, tools } from "../data";
import { useLang } from "../i18n";
import { withBase } from "../base";

const spotlight = projects.find((p) => p.key === "aquapay") || projects[0];

// Le portrait s'incline légèrement vers le pointeur (valeurs lissées, écrites en variables CSS).
function usePointerTilt(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    const onMove = (e) => {
      const r = root.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      target.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
    };
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      root.style.setProperty("--px", cur.x.toFixed(4));
      root.style.setProperty("--py", cur.y.toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [rootRef]);
}

export default function Hero() {
  const { t, tr } = useLang();
  const rootRef = useRef(null);
  usePointerTilt(rootRef);

  return (
    <section id="top" className="nx" ref={rootRef}>
      <div className="nx-words" aria-hidden="true">
        <p className="nx-word">
          <span className="it">{t.heroSmallL}</span>
          <span className="big">{t.heroBigL}</span>
        </p>
        <p className="nx-word right">
          <span className="it">
            {t.heroSmallR} <Sparkles className="nx-spark" size={34} strokeWidth={2.2} />
          </span>
          <span className="big">{t.heroBigR}</span>
        </p>
      </div>

      <div className="nx-portrait" aria-hidden="true">
        <svg className="nx-ring" viewBox="0 0 400 140">
          <ellipse cx="200" cy="70" rx="190" ry="48" />
        </svg>
        <img className="o3d o3d-figma" src={withBase("/images/3d/figma.webp")} alt="" width="360" height="360" />
        <img className="o3d o3d-video-camera" src={withBase("/images/3d/video-camera.webp")} alt="" width="360" height="360" />
        <img className="nx-photo" src={withBase("/images/cisse-cutout.webp")} alt="" width="900" height="880" fetchPriority="high" />
      </div>

      <div className="nx-panel">
        <div className="nx-left">
          <p className="nx-tag">
            <Sparkles size={16} aria-hidden="true" /> {t.status}
          </p>
          <h1 className="nx-title">
            <span className="sr-only">{profile.name}, </span>
            {t.heroTitle}
          </h1>
          <p className="nx-lead">{t.heroLead}</p>
          <a className="nx-cta" href={withBase("/projets/")}>
            {t.ctaWork}
            <span className="nx-cta-ico">
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </a>
          <div className="nx-proof">
            <ul>
              {tools.slice(0, 3).map((tool) => (
                <li key={tool.key}>
                  <img src={withBase(tool.logo)} alt={tool.name} width="256" height="256" />
                </li>
              ))}
            </ul>
            <p>
              <b>{projects.length}</b> {t.proofTitle}
              <br />
              {profile.experienceYears} {t.yearsLabel}
            </p>
          </div>
        </div>

        <div className="nx-right">
          <ul className="nx-feats">
            <li>
              <PenTool size={24} aria-hidden="true" />
              {t.featDesign}
            </li>
            <li>
              <Code2 size={24} aria-hidden="true" />
              {t.featWeb}
            </li>
            <li>
              <Clapperboard size={24} aria-hidden="true" />
              {t.featMotion}
            </li>
          </ul>
          <article className="nx-spot">
            <p className="nx-spot-label">{t.spotlight}</p>
            <img src={withBase(spotlight.image)} alt="" width="1600" height="1200" />
            <h2>{tr(spotlight.title)}</h2>
            <p className="nx-spot-sub">{tr(spotlight.client)}</p>
            <a className="nx-spot-btn" href={withBase("/projets/")} data-cursor="view">
              {t.open} <ArrowRight size={14} aria-hidden="true" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
