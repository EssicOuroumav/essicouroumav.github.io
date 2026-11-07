import { Manrope } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "./data";
import { LangProvider } from "./i18n";
import { withBase } from "./base";

const manrope = Manrope({ subsets: ["latin"], display: "swap", variable: "--font-manrope" });

const title = "Cisse Vamourou · Designer graphique, UI/UX & Web";
const description =
  "Portfolio de Cisse Vamourou, designer graphique et créateur de contenus à Abidjan : identités visuelles, UI/UX, sites et applications web, motion design et gestion des réseaux sociaux.";

export const metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    title,
    description,
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    images: [{ url: `${SITE_URL}/og.jpg`, width: 1200, height: 630, alt: "Cisse Vamourou, designer graphique" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}/og.jpg`] },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9e9ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f17" },
  ],
};

// GitHub Pages ne permet pas d'en-têtes HTTP : la politique de sécurité passe par une balise meta.
// 'unsafe-inline' est requis par les scripts intégrés de l'export statique Next.js.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join("; ");

// Applique le thème avant l'affichage pour éviter un flash clair en mode sombre.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={manrope.variable} suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body style={{ "--clouds": `url("${withBase("/images/clouds.jpg")}")` }}>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
