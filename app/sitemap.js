import { SITE_URL } from "./data";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/mentions-legales/`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
