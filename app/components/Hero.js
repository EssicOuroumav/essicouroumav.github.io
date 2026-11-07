"use client";
import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUp, Check, Play } from "lucide-react";
import { profile, projects, services, tools } from "../data";
import { useLang } from "../i18n";
import { withBase } from "../base";

const heroCards = projects.filter((p) => p.featured).slice(0, 5);

// Objets 3D des métiers du numérique (rendus 3dicons, licence CC0), avec leur profondeur pour la parallaxe.
const objects3d = [
  { name: "computer", depth: 1.2 },
  { name: "figma", depth: 0.8 },
  { name: "video-camera", depth: 1.5 },
  { name: "color-palette", depth: 0.6 },
  { name: "megaphone", depth: 1 },
  { name: "mobile", depth: 1.3 },
];

// Le portrait, l'œil, le curseur de « regard » et la flèche du cercle suivent le pointeur.
// Les valeurs sont lissées (lerp) puis écrites en variables CSS : aucun rendu React à chaque mouvement.
function usePointerFollow(rootRef, gazeRef, labels) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const target = { x: 0, y: 0, mx: 0.5, my: 0.4 };
    const cur = { ...target };
    let raf = 0;
    let t0 = performance.now();

    const onMove = (e) => {
      const r = root.getBoundingClientRect();
      target.mx = (e.clientX - r.left) / r.width;
      target.my = (e.clientY - r.top) / r.height;
      target.x = Math.max(-1, Math.min(1, target.mx * 2 - 1));
      target.y = Math.max(-1, Math.min(1, target.my * 2 - 1));
    };

    const orbit = root.querySelector(".orbit");
    const tick = (now) => {
      if (!fine) {
        // Écran tactile : léger balancement automatique.
        const s = (now - t0) / 1000;
        target.x = Math.sin(s * 0.6) * 0.6;
        target.y = Math.sin(s * 0.4) * 0.2;
        target.mx = 0.5 + target.x * 0.3;
        target.my = 0.4;
      }
      for (const k of ["x", "y", "mx", "my"]) cur[k] += (target[k] - cur[k]) * 0.08;
      root.style.setProperty("--px", cur.x.toFixed(4));
      root.style.setProperty("--py", cur.y.toFixed(4));
      root.style.setProperty("--mx", `${(cur.mx * 100).toFixed(2)}%`);
      root.style.setProperty("--my", `${(cur.my * 100).toFixed(2)}%`);
      if (orbit) {
        const o = orbit.getBoundingClientRect();
        const r = root.getBoundingClientRect();
        const dx = cur.mx * r.width + r.left - (o.left + o.width / 2);
        const dy = cur.my * r.height + r.top - (o.top + o.height / 2);
        root.style.setProperty("--ang", `${(Math.atan2(dy, dx) * 180) / Math.PI + 90}deg`);
      }
      if (gazeRef.current) {
        const deg = Math.round(Math.abs(cur.x) * 90);
        gazeRef.current.textContent = `${deg}° ${cur.x < 0 ? labels.current.left : labels.current.right}`;
      }
      raf = requestAnimationFrame(tick);
    };

    if (reduce) return;
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [rootRef, gazeRef, labels]);
}

export default function Hero() {
  const { t, tr } = useLang();
  const rootRef = useRef(null);
  const gazeRef = useRef(null);
  const labels = useRef({ left: t.left, right: t.right });
  labels.current = { left: t.left, right: t.right };
  usePointerFollow(rootRef, gazeRef, labels);

  return (
    <section id="top" className="hero" ref={rootRef}>
      <div className="hero-light" aria-hidden="true" />
      <div className="hero-word" aria-hidden="true">
        VAMOUROU
      </div>

      <div className="hero-3d" aria-hidden="true">
        {objects3d.map((o) => (
          <img key={o.name} className={`o3d o3d-${o.name}`} src={withBase(`/images/3d/${o.name}.webp`)} alt="" width="360" height="360" style={{ "--depth": o.depth }} />
        ))}
      </div>

      <div className="hero-portrait" aria-hidden="true">
        <div className="portrait-shadow" />
        <img src={withBase("/images/cisse-cutout.webp")} alt="" width="900" height="880" fetchPriority="high" />
      </div>

      <div className="hero-copy">
        <div className="eye" aria-hidden="true">
          <i />
        </div>
        <p className="hero-badge">
          <span className="check">
            <Check size={12} strokeWidth={3} aria-hidden="true" />
          </span>
          {t.badge}
        </p>
        <h1 className="hero-title">
          <span className="sr-only">{profile.name} — </span>
          {t.heroLines.map((line, i) => (
            <span key={line} className={i === 2 ? "line accent" : "line"}>
              {line}
            </span>
          ))}
        </h1>
        <p className="hero-lead">{t.heroLead}</p>
        <div className="hero-cta">
          <a className="btn dark" href={withBase("/projets/")}>
            {t.ctaWork} <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="btn reel" href={withBase("/projets/#motion")}>
            <span className="reel-dot">
              <Play size={14} fill="currentColor" aria-hidden="true" />
            </span>
            {t.ctaReel}
          </a>
        </div>
        <div className="gaze mono" aria-hidden="true">
          <span className="gaze-label">
            <i /> {t.gaze}
          </span>
          <span className="gaze-track">
            <i />
          </span>
          <span ref={gazeRef} className="gaze-value">
            0° {t.right}
          </span>
        </div>
      </div>

      <div className="hero-proof">
        <ul className="proof-avatars">
          {tools.slice(0, 5).map((tool) => (
            <li key={tool.key}>
              <img src={withBase(tool.logo)} alt={tool.name} width="256" height="256" />
            </li>
          ))}
          <li className="proof-count">+{projects.length}</li>
        </ul>
        <p className="proof-title">
          {projects.length} {t.proofTitle}
        </p>
        <p className="proof-sub">
          {profile.experienceYears} {t.yearsLabel} · {services.length} {t.servicesLabel}
        </p>
      </div>

      <div className="orbit" aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <defs>
            <path id="orbit-path" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
          </defs>
          <text>
            <textPath href="#orbit-path">{t.orbit.repeat(2)}</textPath>
          </text>
        </svg>
        <span className="orbit-arrow">
          <ArrowUp size={22} strokeWidth={1.8} />
        </span>
      </div>

      <div className="hero-cards">
        {heroCards.map((p) => {
          const href = p.links.site || p.links.figma || p.links.video || p.links.behance || withBase("/projets/");
          const thumb = p.visual === "video" ? p.poster : p.image || p.logo;
          return (
            <a key={p.key} className="glass-card" href={href} target="_blank" rel="noopener noreferrer">
              <span className="gc-text">
                <b>{tr(p.title)}</b>
                <small>{tr(p.client)}</small>
              </span>
              <img src={withBase(thumb)} alt="" width="400" height="300" />
              <span className="gc-go">{t.go}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
