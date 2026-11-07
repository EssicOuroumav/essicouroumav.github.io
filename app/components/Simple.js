"use client";
import { ArrowLeft } from "lucide-react";
import { profile } from "../data";
import { withBase } from "../base";
import { useLang } from "../i18n";
import Header from "./Header";
import { Footer } from "./Sections";

const legal = {
  fr: {
    title: "Mentions légales",
    blocks: [
      ["Éditeur", `${profile.name}, personne physique, fondateur de Civ'Art, studio de design graphique, motion design et community management (« La créativité ivoirienne »), Port-Bouët, Abidjan (Côte d'Ivoire). Contact : ${profile.email}, ${profile.whatsappLabel}.`],
      ["Hébergement", "GitHub Pages, GitHub Inc., 88 Colton Street, San Francisco, CA 94107, États-Unis."],
      ["Données personnelles", "Ce site ne dépose aucun cookie, ne contient aucun formulaire et ne mesure pas l'audience. Seules vos préférences de langue et de thème sont gardées dans votre navigateur. Si vous m'écrivez par e-mail ou WhatsApp, vos messages servent uniquement à vous répondre."],
      ["Propriété intellectuelle", "Les créations présentées sont des réalisations de Cisse Vamourou pour ses clients ou ses propres projets, montrées avec leur accord. Les marques et logos cités appartiennent à leurs titulaires."],
      ["Crédits", "Logos des outils : marques de leurs éditeurs (Anthropic, Figma, Blackmagic Design, ByteDance, Serif, Meta). Objets 3D : 3dicons (CC0). Icônes d'interface : Lucide (ISC) et Simple Icons (CC0)."],
    ],
  },
  en: {
    title: "Legal notice",
    blocks: [
      ["Publisher", `${profile.name}, individual, founder of Civ'Art, a graphic design, motion design and community management studio, Port-Bouët, Abidjan (Côte d'Ivoire). Contact: ${profile.email}, ${profile.whatsappLabel}.`],
      ["Hosting", "GitHub Pages, GitHub Inc., 88 Colton Street, San Francisco, CA 94107, United States."],
      ["Personal data", "This site sets no cookies, has no forms and runs no analytics. Only your language and theme preferences are kept in your browser. If you contact me by email or WhatsApp, your messages are used only to reply to you."],
      ["Intellectual property", "The work shown was created by Cisse Vamourou for clients or personal projects and is displayed with their consent. Brands and logos belong to their owners."],
      ["Credits", "Tool logos: trademarks of their publishers (Anthropic, Figma, Blackmagic Design, ByteDance, Serif, Meta). 3D objects: 3dicons (CC0). Interface icons: Lucide (ISC) and Simple Icons (CC0)."],
    ],
  },
};

export function LegalPage() {
  const { lang, t } = useLang();
  const c = legal[lang];
  return (
    <>
      <Header />
      <div className="page-band" aria-hidden="true" />
      <main className="simple">
        <h1>{c.title}</h1>
        {c.blocks.map(([h, p]) => (
          <section key={h}>
            <h2>{h}</h2>
            <p>{p}</p>
          </section>
        ))}
        <p>
          <a className="btn" href={withBase("/")}>
            <ArrowLeft size={18} aria-hidden="true" /> {t.backHome}
          </a>
        </p>
      </main>
      <Footer />
    </>
  );
}

export function NotFoundPage() {
  const { lang, t } = useLang();
  return (
    <>
      <Header />
      <div className="page-band" aria-hidden="true" />
      <main className="simple">
        <h1>404</h1>
        <p>{lang === "fr" ? "Cette page n'existe pas ou a été déplacée." : "This page does not exist or has moved."}</p>
        <p>
          <a className="btn solid" href={withBase("/")}>
            <ArrowLeft size={18} aria-hidden="true" /> {t.backHome}
          </a>
        </p>
      </main>
      <Footer />
    </>
  );
}
