"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import { projectsData, Project } from "@/data/projectsData";

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
        top: `calc(7rem + ${index * 24}px)`,
        zIndex: (index + 1) * 10,
      }}
      className="sticky mb-12"
    >
      <motion.div
        style={{ scale }}
        className="group relative rounded-[32px] sm:rounded-[40px] overflow-hidden border border-gray-200/80 bg-white shadow-2xl transition-all duration-500 hover:shadow-indigo-500/10"
      >
        {/* Project Background Image Showcase */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-gray-900">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

          {/* Top Category Badge & Tag */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8 flex flex-wrap gap-2.5 items-center">
            <span className="px-4 py-1.5 rounded-full bg-white/95 text-[11px] font-extrabold uppercase tracking-wider text-black shadow-md">
              {project.category}
            </span>
            <span className="px-3.5 py-1 rounded-full bg-indigo-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
              ✦ Figma Featured
            </span>
          </div>

          {/* Top Right Figma Link Button */}
          {project.figmaUrl !== "#" && (
            <a
              href={project.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-6 right-6 sm:top-8 sm:right-8 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Figma Design</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {/* Circular Arrow Action Button (Navigates to /projects/[id]) */}
          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8">
            <Link
              href={`/projects/${project.id}`}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 active:scale-95"
              aria-label={`View ${project.title} Case Study`}
            >
              <ArrowUpRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </Link>
          </div>

          {/* Bottom Overlay Title & Subtext */}
          <div className="absolute bottom-6 left-6 right-20 sm:bottom-8 sm:left-8 sm:right-28 text-white">
            <Link href={`/projects/${project.id}`}>
              <h3 className="text-xl sm:text-3xl md:text-4xl font-black uppercase font-display tracking-tight leading-none text-white drop-shadow-md group-hover:text-indigo-200 transition-colors">
                {project.title}
              </h3>
            </Link>
            <p className="mt-2.5 text-xs sm:text-sm text-gray-200 font-medium line-clamp-2 max-w-2xl leading-relaxed">
              {project.summary}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tools.slice(0, 3).map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-0.5 rounded-md bg-white/15 text-[10px] font-semibold text-gray-200 border border-white/10"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function PortaviaProjects() {
  const featuredProjects = projectsData.filter((p) => p.tag === "Featured Project");

  return (
    <section id="projects" className="py-24 px-4 bg-[#F8F9FA] text-[#0F1115] relative border-t border-gray-100">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FEATURED FIGMA CASE STUDIES</span>
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-[#0F1115] uppercase tracking-tighter font-display mt-2">
            FEATURED PROJECTS
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Explore 5 hand-crafted UI/UX case studies designed in Figma — ranging from Real Estate platforms and E-Commerce apps to CRM systems, Event Management, and Dating applications.
          </p>
        </div>

        {/* Sticky Stacking Deck */}
        <div className="relative pb-12">
          {featuredProjects.map((project, index) => (
            <CardDeckItem
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Action Button to navigate to /projects */}
        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#0F1115] text-white text-xs font-extrabold tracking-widest uppercase hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-500/20 active:scale-95 gap-2"
          >
            <span>BROWSE ALL {projectsData.length} PROJECTS</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
