"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "SUMMER VIBES FESTIVAL CAMPAIGN",
    category: "Graphic Design",
    description: "Created promotional materials for the \"Summer Vibes Festival,\" including posters, flyers, and social media graphics.",
    image: "/images/project_summer_vibes.png",
  },
  {
    title: "CORAL SPIRAL ABSTRACT",
    category: "Branding",
    description: "A visually striking 3D abstract artwork featuring a coral-colored spiral form with smooth, flowing curves and organic geometry.",
    image: "/images/project_coral_spiral.png",
  },
  {
    title: "SHOPEASE REDESIGN SPRINT",
    category: "UI / UX Design",
    description: "Redesigned the \"ShopEase\" e-commerce app to enhance user experience, focusing on simplifying navigation and checkout.",
    image: "/images/project_shopease.png",
  },
  {
    title: "BLACK GEOMETRIC PRISMS",
    category: "Branding",
    description: "A collection of sharp, angular black prisms floating against a gradient dark background, showcasing sophisticated 3D composition.",
    image: "/images/project_black_prisms.png",
  },
];

export default function PortaviaProjects() {
  return (
    <section id="projects" className="py-24 px-4 bg-[#FFFFFF] dark:bg-[#0B0C0E] transition-colors">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-6xl font-black text-black dark:text-white uppercase tracking-tighter font-display">
            FEATURED PROJECTS
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
            These selected projects reflect my passion for blending strategy with creativity — solving real problems through thoughtful design and impactful storytelling.
          </p>
        </div>

        {/* Stacked Large Project Cards (As seen in video 00:14 - 00:19) */}
        <div className="flex flex-col gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-[36px] overflow-hidden border border-gray-200 dark:border-gray-800 bg-[#F8F9FA] dark:bg-[#13151A] shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* Giant Image Container */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Top Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md text-[11px] font-extrabold uppercase tracking-wider text-black dark:text-white">
                    {project.category}
                  </span>
                </div>

                {/* Floating Arrow Action Circle Button (As seen in video 00:15) */}
                <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8">
                  <a
                    href="#contact"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#6366F1] dark:bg-[#A3E635] text-white dark:text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                    aria-label="View Project"
                  >
                    <ArrowUpRight className="w-6 h-6" />
                  </a>
                </div>

                {/* Bottom Overlay Title & Subtext */}
                <div className="absolute bottom-6 left-6 right-20 sm:bottom-8 sm:left-8 sm:right-24 text-white">
                  <h3 className="text-xl sm:text-3xl md:text-4xl font-black uppercase font-display tracking-tight leading-none">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-gray-300 font-medium line-clamp-2 max-w-2xl">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="mt-16 text-center">
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
