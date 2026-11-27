import Header from "../components/Header";
import DesignGallery from "../components/DesignGallery";
import { Contact, Footer } from "../components/Sections";
import { Cursor, Motion } from "../components/ui";
import { SITE_URL } from "../data";

export const metadata = {
  title: "Design graphique · Cisse Vamourou",
  description: "Flyers, affiches, carrousels, kakémonos, logos et supports imprimés réalisés par Cisse Vamourou, designer graphique à Abidjan.",
  alternates: { canonical: `${SITE_URL}/design-graphique/` },
};

export default function Page() {
  return (
    <>
      <Motion />
      <Cursor />
      <Header />
      <div className="page-band" aria-hidden="true" />
      <main>
        <DesignGallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
