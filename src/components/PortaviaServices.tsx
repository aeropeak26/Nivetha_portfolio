"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { servicesData as fallbackServices, ServiceItem } from "@/data/servicesData";

export default function PortaviaServices() {
  const [services, setServices] = useState<ServiceItem[]>(fallbackServices);
  const [expandedId, setExpandedId] = useState<string>("02");

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services");
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setServices(json.data);
        }
      } catch (e) {
        console.error("Failed to load services", e);
      }
    }
    loadServices();
  }, []);

  const activeService = services.find((s) => s.id === expandedId) || services[0] || fallbackServices[0];

  return (
    <section id="services" className="py-24 px-4 bg-[#F8F9FA] text-[#0F1115] border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Accordion Column */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              ✦ CORE EXPERTISE
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-[#0F1115] uppercase tracking-tighter font-display leading-tight mt-1">
              WHAT I CAN DO FOR YOU
            </h2>

            <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium leading-relaxed max-w-lg">
              Combining visual design excellence with front-end technical execution to deliver high-converting digital products.
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
                            ? "text-indigo-600"
                            : "text-[#0F1115] group-hover:text-indigo-600"
                        }`}
                      >
                        {service.title}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-indigo-600" : "text-gray-400"
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
                          {service.items && service.items.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700 font-medium"
                            >
                              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
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
                src={activeService.image || "/images/agency_workspace.png"}
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
