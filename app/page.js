import Header from "./components/Header";
import Work from "./components/Work";
import { Contact, Footer, Hero, Journey, Services, ToolStrip, Tools } from "./components/Sections";
import { Motion } from "./components/ui";

export default function Home() {
  return (
    <>
      <Motion />
      <Header />
      <main>
        <Hero />
        <ToolStrip />
        <Services />
        <Work />
        <Tools />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
