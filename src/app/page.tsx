import PortaviaNavbar from "@/components/PortaviaNavbar";
import PortaviaHero from "@/components/PortaviaHero";
import PortaviaServices from "@/components/PortaviaServices";
import PortaviaAbout from "@/components/PortaviaAbout";
import PortaviaProjects from "@/components/PortaviaProjects";
import PortaviaTestimonials from "@/components/PortaviaTestimonials";
import PortaviaFaq from "@/components/PortaviaFaq";
import PortaviaBlogs from "@/components/PortaviaBlogs";
import PortaviaContact from "@/components/PortaviaContact";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#0F1115] selection:bg-[#6366F1] selection:text-white">
      <PortaviaNavbar />
      <PortaviaHero />
      <PortaviaServices />
      <PortaviaAbout />
      <PortaviaProjects />
      <PortaviaTestimonials />
      <PortaviaFaq />
      <PortaviaBlogs />
      <PortaviaContact />
    </main>
  );
}
