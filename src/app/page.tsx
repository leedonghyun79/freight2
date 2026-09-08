import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MiddleSection from "@/components/MiddleSection";
import ServiceSection from "@/components/ServiceSection";
import TechnologySpecs from "@/components/TechnologySpecs";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import ContactSection from "@/components/ContactSection";
import FloatingAction from "@/components/FloatingAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col antialiased selection:bg-primary-orange selection:text-white">
      <Navbar />
      <Hero />
      
      {/* Scroll Overlay Container: Subsequent sections scroll OVER the Hero */}
      <div className="relative z-10 bg-white">
        <MiddleSection />
        <ServiceSection />
        <TechnologySpecs />
        <PortfolioCarousel />
        <ContactSection />
        <FloatingAction />
        <Footer />
      </div>
    </main>
  );
}
