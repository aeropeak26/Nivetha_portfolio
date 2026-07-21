"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, Code, Share2, Mail, ArrowUpRight } from "lucide-react";

export default function PortaviaAbout() {
  const stats = [
    { value: "12", label: "Years of Experience" },
    { value: "270", label: "Completed Projects" },
    { value: "50+", label: "Clients Worldwide" },
  ];

  return (
    <section id="about" className="py-24 px-4 bg-[#F8F9FA] dark:bg-[#090A0F] transition-colors">
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
            <h2 className="text-4xl sm:text-6xl font-black text-black dark:text-white uppercase tracking-tighter font-display leading-tight">
              ABOUT ME
            </h2>

            <p className="mt-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium leading-relaxed max-w-xl">
              Hi, I'm Duncan — a digital designer and Framer developer passionate about crafting meaningful and impactful digital experiences.
            </p>

            {/* Metrics Row */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-y border-gray-200 dark:border-gray-800 py-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span className="text-4xl sm:text-5xl font-black text-black dark:text-white font-display">
                    {stat.value}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct Contact Info */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div>
                <span className="text-gray-400 font-medium">Call Today :</span>
                <p className="font-extrabold text-black dark:text-white mt-0.5">+1 (555) 123-4567</p>
              </div>
              <div>
                <span className="text-gray-400 font-medium">Email :</span>
                <p className="font-extrabold text-black dark:text-white mt-0.5">designer@example.com</p>
              </div>
            </div>

            {/* Social Icons & Story Button */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex gap-2">
                {[Globe, Code, Mail, Share2].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-full bg-white dark:bg-[#13151A] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center hover:bg-[#6366F1] dark:hover:bg-[#A3E635] hover:text-white dark:hover:text-black transition-all shadow-sm"
                    aria-label="Social Icon"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              <a
                href="#contact"
                className="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-xs font-black tracking-wider uppercase text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              >
                MY STORY
              </a>
            </div>
          </motion.div>

          {/* Right Tilted Portrait Card (As seen in video 00:12) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-64 sm:w-80 aspect-[3/4] rounded-[36px] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 transform rotate-3 hover:rotate-0 transition-transform duration-500">
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
