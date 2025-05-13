// Home.tsx
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import About from "./About";

export default function Home() {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 relative overflow-hidden">
      <Navigation />
      <div className="pt-16">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
