import Header from "./components/Header";
import Hero from "./components/Hero";
import { ProjectShowcase } from "./components/Work";
import { Contact, Footer, Journey, Marquee, Skills, Tools } from "./components/Sections";
import { Cursor, Motion } from "./components/ui";

export default function Home() {
  return (
    <>
      <Motion />
      <Cursor />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <ProjectShowcase />
        <Skills />
        <Tools />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
