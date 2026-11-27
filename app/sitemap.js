import { SITE_URL, projects } from "./data";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/projets/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/design-graphique/`, changeFrequency: "monthly", priority: 0.8 },
    ...projects.map((p) => ({ url: `${SITE_URL}/projets/${p.key}/`, changeFrequency: "yearly", priority: 0.6 })),
    { url: `${SITE_URL}/mentions-legales/`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
