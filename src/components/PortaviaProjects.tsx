"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Portavia Template",
    category: "Framer Marketplace",
    description: "A modern portfolio template built to showcase work with clarity, style, and purpose.",
    image: "/images/project_1.png",
    link: "#",
  },
  {
    title: "Veloce Dashboard",
    category: "SaaS App & UI UX",
    description: "High-performance analytics dashboard designed for enterprise AI platforms.",
    image: "/images/agency_workspace.png",
    link: "#",
  },
  {
    title: "Apex Brand System",
    category: "Visual Identity",
    description: "Complete design guidelines, typography hierarchy, and UI component kit.",
    image: "/images/hero_portrait.png",
    link: "#",
  },
];

export default function PortaviaProjects() {
  return (
    <section id="projects" className="py-20 px-4 bg-[#F8F9FA] dark:bg-[#090A0F] transition-colors">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#6366F1] dark:text-indigo-400">
              ✦ SELECTED WORKS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-black dark:text-white mt-2 tracking-tight">
              Featured Projects
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium max-w-xs">
            A curated selection of web applications, Framer templates, and brand design systems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white dark:bg-[#11131A] border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-black dark:text-white">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-[#6366F1] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-6 pb-6 pt-0 flex items-center justify-between">
                <a
                  href={project.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-black dark:text-white group-hover:text-[#6366F1] transition-colors"
                >
                  <span>View Project</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
