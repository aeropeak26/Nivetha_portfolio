import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaContactSection from "@/components/CtaContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08090A] text-white selection:bg-[#E5FE00] selection:text-[#0B0C0E]">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <ServicesSection />
      <MarqueeBanner />
      <TeamSection />
      <TestimonialsSection />
      <CtaContactSection />
      <Footer />
    </main>
  );
}
