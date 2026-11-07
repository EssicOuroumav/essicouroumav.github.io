"use client";
import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { brandIcons } from "../brandIcons";
import { useLang } from "../i18n";

export function BrandIcon({ name, size = 24, color, title }) {
  const icon = brandIcons[name];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color || icon.hex}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path d={icon.path} />
    </svg>
  );
}

export function ThemeToggle() {
  const { t } = useLang();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const label = theme === "dark" ? t.themeLight : t.themeDark;
  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label={label} title={label}>
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export function LangSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="lang" role="group" aria-label={t.langLabel}>
      {["fr", "en"].map((l) => (
        <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

// Apparitions au défilement (GSAP). Sans effet si l'utilisateur préfère réduire les animations.
export function Motion() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 32,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
        gsap.utils.toArray("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: end,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 95%", once: true },
            onUpdate: () => (el.textContent = Math.round(obj.v)),
          });
        });
      });
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);
  return null;
}

// Heure locale d'Abidjan, mise à jour chaque minute (vide au rendu statique pour éviter un décalage).
export function LiveClock({ timeZone }) {
  const [now, setNow] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [timeZone]);
  return <time suppressHydrationWarning>{now || "--:--"}</time>;
}

// Vidéo muette en boucle : lancée quand elle est à l'écran (ou au survol de son parent), en pause sinon.
export function LoopVideo({ src, poster, className, hoverTarget }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const play = () => v.play().catch(() => {});
    const pause = () => v.pause();
    const hover = matchMedia("(hover: hover)").matches && hoverTarget;
    if (hover) {
      const el = v.closest(hoverTarget);
      el?.addEventListener("mouseenter", play);
      el?.addEventListener("mouseleave", pause);
      return () => {
        el?.removeEventListener("mouseenter", play);
        el?.removeEventListener("mouseleave", pause);
      };
    }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : pause()), { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, [hoverTarget]);
  return <video ref={ref} className={className} src={src} poster={poster} muted loop playsInline preload="none" aria-hidden="true" />;
}

// Curseur animé : un point qui suit exactement le pointeur et un anneau qui le rattrape en douceur.
// L'anneau grossit sur les liens et affiche « Voir » sur les éléments marqués data-cursor="view".
export function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);
  const { t } = useLang();
  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    document.documentElement.classList.add("has-cursor");
    const p = { x: -100, y: -100 };
    const r = { x: -100, y: -100 };
    let raf = 0;
    const onMove = (e) => {
      p.x = e.clientX;
      p.y = e.clientY;
      const el = e.target.closest?.("a, button, [data-cursor]");
      ring.current?.classList.toggle("is-link", !!el);
      ring.current?.classList.toggle("is-view", el?.dataset?.cursor === "view");
    };
    const onLeave = () => ring.current?.classList.add("is-hidden");
    const onEnter = () => ring.current?.classList.remove("is-hidden");
    const tick = () => {
      r.x += (p.x - r.x) * 0.18;
      r.y += (p.y - r.y) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${p.x}px, ${p.y}px)`;
      if (ring.current) ring.current.style.transform = `translate(${r.x}px, ${r.y}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span>{t.go}</span>
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
