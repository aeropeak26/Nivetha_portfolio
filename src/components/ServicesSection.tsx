"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Action Strategy",
    subtitle: "Product Architecture & Roadmapping",
    description: "In-depth market positioning, user persona mapping, and technical roadmap development to ensure maximum ROI.",
    tags: ["UX Strategy", "Product Roadmaps", "Growth Hacking"],
    image: "/images/agency_workspace.png",
  },
  {
    id: 2,
    title: "Web Design & Development",
    subtitle: "High-Performance Next.js & Web Apps",
    description: "Building lightning-fast, SEO-optimized web applications with Next.js, React, Tailwind CSS, and custom APIs.",
    tags: ["Next.js App Router", "Tailwind CSS", "Full Stack API"],
    image: "/images/hero_portrait.png",
  },
  {
    id: 3,
    title: "Brand Identity & Visual Design",
    subtitle: "Iconic Logos & Design Systems",
    description: "Creating comprehensive brand guidelines, color palettes, typography scales, and UI design tokens that stand out.",
    tags: ["Design Systems", "Brand Identity", "Visual Language"],
    image: "/images/agency_workspace.png",
  },
  {
    id: 4,
    title: "Motion & Creative Direction",
    subtitle: "Interactive Animations & Micro-Interactions",
    description: "Elevating user experience through smooth Framer Motion scroll animations, 3D elements, and micro-interactions.",
    tags: ["Framer Motion", "Parallax Scroll", "Micro-Interactions"],
    image: "/images/hero_portrait.png",
  },
];

export default function ServicesSection() {
  const [activeId, setActiveId] = useState(1);
  const activeService = services.find((s) => s.id === activeId) || services[0];

  return (
    <section id="services" className="py-20 px-4 md:px-6 bg-[#0B0C0E] text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5FE00] text-[#0B0C0E] text-xs font-black uppercase tracking-wider mb-4">
              ✦ Our Services
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Tailored Solutions For <br className="hidden sm:inline" />
              <span className="text-[#E5FE00]">Exponential Growth</span>
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-gray-400 font-medium">
            We bridge the gap between vision and impact by crafting digital experiences that are strategic, intentional, and built for performance.
          </p>
        </div>

        {/* Accordion + Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Accordion Column */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {services.map((service) => {
              const isActive = service.id === activeId;
              return (
                <motion.div
                  key={service.id}
                  onClick={() => setActiveId(service.id)}
                  className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 border ${
                    isActive
                      ? "bg-[#131518] border-[#E5FE00]/50 shadow-[0_0_25px_rgba(229,254,0,0.15)]"
                      : "bg-[#0F1115] border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          isActive
                            ? "bg-[#E5FE00] text-[#0B0C0E]"
                            : "bg-white/10 text-gray-400"
                        }`}
                      >
                        {service.id}
                      </span>
                      <h3
                        className={`text-lg md:text-xl font-bold transition-colors ${
                          isActive ? "text-[#E5FE00]" : "text-white"
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <ArrowUpRight
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isActive ? "rotate-45 text-[#E5FE00]" : "text-gray-500"
                      }`}
                    />
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-white/10"
                      >
                        <p className="text-sm text-gray-300 leading-relaxed font-normal">
                          {service.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-gray-300 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Right Preview Card */}
          <div className="lg:col-span-6 relative bg-[#131518] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden min-h-[420px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 mb-6"
              >
                <Image
                  src={activeService.image}
                  alt={activeService.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/90 via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4 bg-[#0B0C0E]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-bold text-[#E5FE00]">
                  {activeService.subtitle}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div>
                <h4 className="text-lg font-extrabold text-white">
                  {activeService.title}
                </h4>
                <p className="text-xs text-gray-400">
                  Ready to deploy for your next campaign.
                </p>
              </div>

              <a
                href="#contact"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#E5FE00] text-[#0B0C0E] font-extrabold text-sm hover:bg-[#D4F82C] transition-all flex items-center justify-center gap-2 group shrink-0"
              >
                <span>See Our Work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
