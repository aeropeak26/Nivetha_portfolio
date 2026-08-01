"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { projectsData as fallbackProjects, Project } from "@/data/projectsData";

function CardDeckItem({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  return (
    <div
      ref={containerRef}
      style={{
        top: `calc(5.5rem + ${index * 20}px)`,
        zIndex: (index + 1) * 10,
      }}
      className="sticky mb-10 sm:mb-12"
    >
      <motion.div
        style={{ scale }}
        className="group relative rounded-[28px] sm:rounded-[40px] overflow-hidden border border-gray-200/80 bg-white shadow-2xl transition-all duration-500 hover:shadow-indigo-500/10"
      >
        {/* Card Main Container: Tall Aspect on Mobile (min-h-[460px]), Wide Aspect on Desktop */}
        <div className="relative w-full min-h-[440px] sm:min-h-[400px] sm:aspect-[21/9] overflow-hidden bg-gray-950 flex flex-col justify-between p-5 sm:p-8">
          
          {/* Background Showcase Image */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9] group-hover:brightness-100"
          />
          
          {/* Dark Vignette Overlay for Crisp Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 pointer-events-none" />

          {/* Top Row: Category Badges & Figma Link */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="px-3.5 py-1 rounded-full bg-white/95 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-black shadow-md">
                {project.category}
              </span>
              <span className="hidden sm:inline-flex px-3.5 py-1 rounded-full bg-indigo-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                ✦ Figma Featured
              </span>
            </div>

            {project.figmaUrl !== "#" && (
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white text-[11px] sm:text-xs font-semibold backdrop-blur-md border border-white/20 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Figma Design</span>
                <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>
            )}
          </div>

          {/* Bottom Row: Content & Navigation Button */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-auto pt-6">
            
            {/* Title & Subtext */}
            <div className="max-w-2xl text-white">
              <Link href={`/projects/${project.id}`}>
                <h3 className="text-xl sm:text-3xl md:text-4xl font-black uppercase font-display tracking-tight leading-tight text-white drop-shadow-md group-hover:text-indigo-200 transition-colors">
                  {project.title}
                </h3>
              </Link>
              <p className="mt-2 text-xs sm:text-sm text-gray-200 font-medium line-clamp-2 leading-relaxed">
                {project.summary}
              </p>
              
              {/* Tool Chips */}
              <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                {project.tools.slice(0, 3).map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-0.5 rounded-md bg-white/15 text-[10px] font-semibold text-gray-200 border border-white/10 backdrop-blur-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Circular Navigation Arrow Button */}
            <div className="shrink-0 self-end sm:self-auto">
              <Link
                href={`/projects/${project.id}`}
                className="w-11 h-11 sm:w-16 sm:h-16 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 active:scale-95"
                aria-label={`View ${project.title} Case Study`}
              >
                <ArrowUpRight className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2.5]" />
              </Link>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default function PortaviaProjects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProjects(json.data);
        }
      } catch (e) {
        console.error("Failed to load projects", e);
      }
    }
    loadProjects();
  }, []);

  const featuredProjects = projects.filter((p) => p.tag === "Featured Project" || p.featuredOnHero);

  return (
    <section id="projects" className="py-20 sm:py-24 px-4 bg-[#F8F9FA] text-[#0F1115] relative border-t border-gray-100">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FEATURED FIGMA CASE STUDIES</span>
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0F1115] uppercase tracking-tighter font-display mt-1">
            FEATURED PROJECTS
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Explore hand-crafted UI/UX case studies designed in Figma — ranging from Real Estate platforms and E-Commerce apps to CRM systems, Event Management, and Dating applications.
          </p>
        </div>

        {/* Sticky Stacking Deck */}
        <div className="relative pb-8 sm:pb-12">
          {featuredProjects.map((project, index) => (
            <CardDeckItem
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Action Button */}
        <div className="mt-6 sm:mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-[#0F1115] text-white text-xs font-extrabold tracking-widest uppercase hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-500/20 active:scale-95 gap-2"
          >
            <span>BROWSE ALL {projects.length} PROJECTS</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
