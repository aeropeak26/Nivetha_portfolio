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
    <main className="min-h-screen bg-[#FFFFFF] dark:bg-[#0B0C0E] text-[#0F1115] dark:text-[#F9FAFB] transition-colors selection:bg-[#6366F1] dark:selection:bg-[#A3E635] selection:text-white dark:selection:text-black">
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
