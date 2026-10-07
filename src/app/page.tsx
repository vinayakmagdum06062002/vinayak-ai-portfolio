import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { SelectedSystems } from "@/components/sections/SelectedSystems";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";
import { Architecture } from "@/components/sections/Architecture";
import { Capabilities } from "@/components/sections/Capabilities";
import { Stack } from "@/components/sections/Stack";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Approach } from "@/components/sections/Approach";
import { Experience } from "@/components/sections/Experience";
import { AskAI } from "@/components/sections/AskAI";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <SelectedSystems />
        <CurrentlyBuilding />
        <Architecture />
        <Capabilities />
        <Stack />
        <CaseStudies />
        <Approach />
        <Experience />
        <AskAI />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
