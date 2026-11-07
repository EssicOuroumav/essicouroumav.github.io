import Header from "../components/Header";
import { ProjectsGrid } from "../components/Work";
import { Contact, Footer } from "../components/Sections";
import { Motion } from "../components/ui";
import { SITE_URL } from "../data";

export const metadata = {
  title: "Projets · Cisse Vamourou",
  description: "Sites web, applications, interfaces, identités visuelles, print et motion design réalisés par Cisse Vamourou.",
  alternates: { canonical: `${SITE_URL}/projets/` },
};

export default function Page() {
  return (
    <>
      <Motion />
      <Header />
      <main>
        <ProjectsGrid />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
