import { JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "./data";
import { LangProvider } from "./i18n";

const poppins = Poppins({ subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700", "800"], variable: "--font-sans" });
const poppinsItalic = Poppins({ subsets: ["latin"], display: "swap", weight: "800", style: "italic", variable: "--font-italic", preload: false });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", weight: ["400", "500"], variable: "--font-mono" });

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
    { media: "(prefers-color-scheme: light)", color: "#EDE4F7" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1030" },
  ],
};

// GitHub Pages ne permet pas d'en-têtes HTTP : la politique de sécurité passe par une balise meta.
// 'unsafe-inline' est requis par les scripts intégrés de l'export statique Next.js.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "media-src 'self'",
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
    <html lang="fr" className={`${poppins.variable} ${poppinsItalic.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
