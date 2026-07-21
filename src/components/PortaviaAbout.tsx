"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, Code, Share2, Mail } from "lucide-react";

export default function PortaviaAbout() {
  const stats = [
    { value: "12", label: "Years of Experience" },
    { value: "270", label: "Completed Projects" },
    { value: "50+", label: "Clients Worldwide" },
  ];

  return (
    <section id="about" className="py-24 px-4 bg-white text-[#0F1115]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <h2 className="text-4xl sm:text-6xl font-bold text-[#0F1115] uppercase tracking-tighter font-display leading-tight">
              ABOUT ME
            </h2>

            <p className="mt-4 text-sm sm:text-base text-gray-700 font-medium leading-relaxed max-w-xl">
              Hi, I'm Duncan — a digital designer and Framer developer passionate about crafting meaningful and impactful digital experiences.
            </p>

            {/* Metrics Row */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-y border-gray-200 py-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span className="text-4xl sm:text-5xl font-bold text-[#0F1115] font-display">
                    {stat.value}
                  </span>
                  <p className="text-xs text-gray-500 font-semibold mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct Contact Info */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div>
                <span className="text-gray-500 font-medium">Call Today :</span>
                <p className="font-bold text-[#0F1115] mt-0.5">+1 (555) 123-4567</p>
              </div>
              <div>
                <span className="text-gray-500 font-medium">Email :</span>
                <p className="font-bold text-[#0F1115] mt-0.5">designer@example.com</p>
              </div>
            </div>

            {/* Social Icons & Story Button */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex gap-2">
                {[Globe, Code, Mail, Share2].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-full bg-[#F8F9FA] border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-[#6366F1] hover:text-white transition-all shadow-sm"
                    aria-label="Social Icon"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              <a
                href="#contact"
                className="px-6 py-2 rounded-full border border-gray-300 text-xs font-bold tracking-wider uppercase text-[#0F1115] hover:bg-[#0F1115] hover:text-white transition-all"
              >
                MY STORY
              </a>
            </div>
          </motion.div>

          {/* Right Tilted Portrait Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-64 sm:w-80 aspect-[3/4] rounded-[36px] overflow-hidden shadow-xl border border-gray-200 bg-[#F8F9FA] transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/images/duncan_portrait.png"
                alt="Duncan Robert About Portrait"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
