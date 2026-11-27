"use client";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { designCategories } from "../designs";
import { useLang } from "../i18n";
import { withBase } from "../base";

const all = designCategories.flatMap((c) => c.items.map((it) => ({ ...it, cat: c.key, label: c.label })));

// Galerie « Design graphique » : filtres par catégorie, mosaïque, vue agrandie au clic.
// Aucun lien externe : les visuels sont servis par le site lui-même.
export default function DesignGallery() {
  const { t, tr } = useLang();
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.replace("#", "");
      if (designCategories.some((c) => c.key === h)) setFilter(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const shown = filter === "all" ? all : all.filter((it) => it.cat === filter);
  const close = useCallback(() => setOpen(-1), []);
  const step = useCallback((d) => setOpen((i) => (i + d + shown.length) % shown.length), [shown.length]);

  useEffect(() => {
    if (open < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const cur = open >= 0 ? shown[open] : null;
  const alt = (it, i) => `${t.designH} · ${tr(it.label)}${it.group ? ` · ${it.group}` : ""} · ${i + 1}`;

  return (
    <section className="sec projects-page">
      <div className="pp-head">
        <p className="kicker mono">
          <span>({String(all.length).padStart(2, "0")})</span>
          {t.designKicker}
        </p>
        <h1 className="pp-title">{t.designH}</h1>
        <p className="sec-intro">{t.designIntro}</p>
      </div>
      <div className="filters" role="group" aria-label={t.designFilters}>
        {[{ key: "all", label: null, items: all }, ...designCategories].map((c) => (
          <button key={c.key} type="button" aria-pressed={filter === c.key} onClick={() => setFilter(c.key)}>
            {c.label ? tr(c.label) : t.designAll} <span className="mono">{c.items.length}</span>
          </button>
        ))}
      </div>
      <ul className="dg">
        {shown.map((it, i) => (
          <li key={it.src}>
            <button type="button" className="dg-item" onClick={() => setOpen(i)} data-cursor="view" aria-label={`${t.designOpen} : ${alt(it, i)}`}>
              <img src={withBase(it.src)} alt="" width={it.w} height={it.h} loading="lazy" decoding="async" />
              <span className="dg-cap">{it.group || tr(it.label)}</span>
            </button>
          </li>
        ))}
      </ul>

      {cur && (
        <div className="dg-box" role="dialog" aria-modal="true" aria-label={alt(cur, open)} onClick={close}>
          <img src={withBase(cur.src)} alt={alt(cur, open)} width={cur.w} height={cur.h} onClick={(e) => e.stopPropagation()} />
          <p className="dg-count mono">
            {open + 1} / {shown.length} · {cur.group || tr(cur.label)}
          </p>
          <button type="button" className="dg-btn dg-close" onClick={close} aria-label={t.designClose} autoFocus>
            <X size={22} aria-hidden="true" />
          </button>
          <button type="button" className="dg-btn dg-prev" onClick={(e) => (e.stopPropagation(), step(-1))} aria-label={t.designPrev}>
            <ArrowLeft size={22} aria-hidden="true" />
          </button>
          <button type="button" className="dg-btn dg-next" onClick={(e) => (e.stopPropagation(), step(1))} aria-label={t.designNext}>
            <ArrowRight size={22} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
