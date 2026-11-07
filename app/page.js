import Header from "./components/Header";
import { Featured } from "./components/Work";
import { Contact, Footer, Hero, Journey, Marquee, Skills, Tools } from "./components/Sections";
import { Motion } from "./components/ui";

export default function Home() {
  return (
    <>
      <Motion />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Featured />
        <Skills />
        <Tools />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
