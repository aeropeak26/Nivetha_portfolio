import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projectsData, Project } from "@/data/projectsData";
import PortaviaNavbar from "@/components/PortaviaNavbar";
import Footer from "@/components/Footer";
import ProjectDetailClient from "@/components/ProjectDetailClient";

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const currentIndex = projectsData.findIndex((p) => p.id === id);
  const prevProject = projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#0F1115] selection:bg-indigo-600 selection:text-white flex flex-col">
      <PortaviaNavbar />

      <ProjectDetailClient
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />

      <Footer />
    </main>
  );
}
