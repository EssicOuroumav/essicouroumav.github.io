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
