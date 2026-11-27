import Header from "../../components/Header";
import ProjectDetail from "../../components/ProjectDetail";
import { Contact, Footer } from "../../components/Sections";
import { Cursor, Motion } from "../../components/ui";
import { SITE_URL, projects } from "../../data";

// Une page statique par projet (export GitHub Pages).
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.key }));
}

export const dynamicParams = false;

const fr = (v) => (v && typeof v === "object" ? v.fr : v);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = projects.find((x) => x.key === slug);
  const image = p.visual === "video" ? p.poster : p.image || "/og.jpg";
  return {
    title: `${fr(p.title)} · Cisse Vamourou`,
    description: fr(p.desc),
    alternates: { canonical: `${SITE_URL}/projets/${p.key}/` },
    openGraph: { title: `${fr(p.title)} · Cisse Vamourou`, description: fr(p.desc), images: [`${SITE_URL}${image}`] },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return (
    <>
      <Motion />
      <Cursor />
      <Header />
      <div className="page-band" aria-hidden="true" />
      <main>
        <ProjectDetail slug={slug} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
