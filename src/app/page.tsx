import PortaviaNavbar from "@/components/PortaviaNavbar";
import PortaviaHero from "@/components/PortaviaHero";
import PortaviaAbout from "@/components/PortaviaAbout";
import PortaviaProjects from "@/components/PortaviaProjects";
import PortaviaBlogs from "@/components/PortaviaBlogs";
import PortaviaContact from "@/components/PortaviaContact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] dark:bg-[#090A0F] text-[#0F1115] dark:text-[#F9FAFB] transition-colors selection:bg-[#6366F1] selection:text-white">
      <PortaviaNavbar />
      <PortaviaHero />
      <PortaviaAbout />
      <PortaviaProjects />
      <PortaviaBlogs />
      <PortaviaContact />
    </main>
  );
}
