"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown, CheckCircle2 } from "lucide-react";

const services = [
  {
    id: "01",
    title: "1. UI/UX DESIGN",
    items: [
      "User research and persona mapping",
      "Wireframing & interactive prototypes",
      "Design systems & component libraries",
      "Usability testing & conversion optimization",
    ],
    image: "/images/agency_workspace.png",
  },
  {
    id: "02",
    title: "2. GRAPHIC DESIGN",
    items: [
      "Logo and brand identity design",
      "Social media graphics and ad creatives",
      "Infographics and data visualization",
      "Custom illustrations and icons",
    ],
    image: "/images/project_1.png",
  },
  {
    id: "03",
    title: "3. WEB DESIGN",
    items: [
      "Custom Next.js & Framer website design",
      "Responsive layout for mobile & desktop",
      "High performance & SEO optimization",
      "Scroll animations & micro-interactions",
    ],
    image: "/images/project_shopease.png",
  },
  {
    id: "04",
    title: "4. BRANDING",
    items: [
      "Comprehensive brand strategy & positioning",
      "Color palettes & typography scale",
      "Brand voice & messaging guidelines",
      "Marketing collateral & pitch deck design",
    ],
    image: "/images/project_coral_spiral.png",
  },
];

export default function PortaviaServices() {
  const [expandedId, setExpandedId] = useState<string>("02");

  const activeService = services.find((s) => s.id === expandedId) || services[1];

  return (
    <section className="py-24 px-4 bg-[#F8F9FA] text-[#0F1115] border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Accordion Column */}
          <div className="lg:col-span-6">
            <h2 className="text-4xl sm:text-6xl font-bold text-[#0F1115] uppercase tracking-tighter font-display leading-tight">
              WHAT I CAN DO FOR YOU
            </h2>

            <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium leading-relaxed max-w-lg">
              As a digital designer, I am a visual storyteller, crafting experiences that connect deeply and spark creativity.
            </p>

            {/* Accordion List */}
            <div className="mt-10 flex flex-col gap-4">
              {services.map((service) => {
                const isOpen = expandedId === service.id;
                return (
                  <div
                    key={service.id}
                    className="border-b border-gray-200 pb-4"
                  >
                    <button
                      onClick={() => setExpandedId(isOpen ? "" : service.id)}
                      className="w-full flex items-center justify-between py-2 text-left group"
                    >
                      <span
                        className={`text-xl sm:text-2xl font-bold uppercase font-display tracking-tight transition-colors ${
                          isOpen
                            ? "text-[#6366F1]"
                            : "text-[#0F1115] group-hover:text-[#6366F1]"
                        }`}
                      >
                        {service.title}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[#6366F1]" : "text-gray-400"
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 pl-2 flex flex-col gap-2.5"
                        >
                          {service.items.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-medium"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#6366F1] shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Tilted Showcase Card */}
          <div className="lg:col-span-6 relative flex justify-center">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, rotate: 2, scale: 0.95 }}
              animate={{ opacity: 1, rotate: 4, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-md aspect-[4/3] rounded-[32px] overflow-hidden shadow-xl border border-gray-200 bg-white transform rotate-3 hover:rotate-0 transition-transform duration-500"
            >
              <Image
                src={activeService.image}
                alt={activeService.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
