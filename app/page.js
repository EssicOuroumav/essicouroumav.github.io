import Header from "./components/Header";
import Hero from "./components/Hero";
import { ProjectIndex } from "./components/Work";
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
        <ProjectIndex />
        <Skills />
        <Tools />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
