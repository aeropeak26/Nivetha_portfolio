"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "SUMMER VIBES FESTIVAL CAMPAIGN",
    category: "Graphic Design",
    description: "Created promotional materials for the \"Summer Vibes Festival,\" including posters, flyers, and social media graphics.",
    image: "/images/project_summer_vibes.png",
    accentBg: "bg-[#0f172a]",
  },
  {
    id: "02",
    title: "CORAL SPIRAL ABSTRACT",
    category: "Branding",
    description: "A visually striking 3D abstract artwork featuring a coral-colored spiral form with smooth, flowing curves and organic geometry.",
    image: "/images/project_coral_spiral.png",
    accentBg: "bg-[#18181b]",
  },
  {
    id: "03",
    title: "SHOPEASE REDESIGN SPRINT",
    category: "UI / UX Design",
    description: "Redesigned the \"ShopEase\" e-commerce app to enhance user experience, focusing on simplifying navigation and checkout.",
    image: "/images/project_shopease.png",
    accentBg: "bg-[#09090b]",
  },
  {
    id: "04",
    title: "BLACK GEOMETRIC PRISMS",
    category: "Branding",
    description: "A collection of sharp, angular black prisms floating against a gradient dark background, showcasing sophisticated 3D composition.",
    image: "/images/project_black_prisms.png",
    accentBg: "bg-[#11131a]",
  },
];

function CardDeckItem({
  project,
  index,
  total,
}: {
  project: (typeof projects)[0];
  index: number;
  total: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

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
        className="group relative rounded-[32px] sm:rounded-[40px] overflow-hidden border border-gray-200 dark:border-gray-800 bg-[#0F1115] shadow-2xl transition-all duration-500"
      >
        {/* Project Background Showcase Image */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Top Category Badge */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
            <span className="px-4 py-1.5 rounded-full bg-white/95 text-[11px] font-extrabold uppercase tracking-wider text-black shadow-md">
              {project.category}
            </span>
          </div>

          {/* Circular Arrow Button (matching user image screenshot with neon green/purple accent!) */}
          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8">
            <a
              href="#contact"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#A3E635] text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 active:scale-95"
              aria-label="View Project"
            >
              <ArrowUpRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
            </a>
          </div>

          {/* Bottom Title & Description Overlay */}
          <div className="absolute bottom-6 left-6 right-20 sm:bottom-8 sm:left-8 sm:right-28 text-white">
            <h3 className="text-xl sm:text-3xl md:text-5xl font-black uppercase font-display tracking-tight leading-none text-white drop-shadow-md">
              {project.title}
            </h3>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-gray-200 font-medium line-clamp-2 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function PortaviaProjects() {
  return (
    <section id="projects" className="py-24 px-4 bg-white dark:bg-[#0B0C0E] transition-colors relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6366F1] dark:text-indigo-400">
            ✦ STACKING PARALLAX SHOWCASE
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-black dark:text-white uppercase tracking-tighter font-display mt-2">
            FEATURED PROJECTS
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
            These selected projects reflect my passion for blending strategy with creativity — solving real problems through thoughtful design and impactful storytelling.
          </p>
        </div>

        {/* Sticky Stacking Parallax Deck (Old z-10, New z-20, z-30, z-40) */}
        <div className="relative pb-16">
          {projects.map((project, index) => (
            <CardDeckItem
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-8 text-center">
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-black dark:border-white text-xs font-black tracking-widest uppercase text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-md active:scale-95"
          >
            BROWSE ALL PROJECTS
          </a>
        </div>

      </div>
    </section>
  );
}
