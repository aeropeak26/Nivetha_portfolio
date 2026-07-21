"use client";

import { motion } from "framer-motion";
import { Sparkles, CheckCircle } from "lucide-react";

export default function PortaviaAbout() {
  const stats = [
    { label: "Years Experience", value: "05+" },
    { label: "Projects Delivered", value: "40+" },
    { label: "Client Rating", value: "99%" },
  ];

  const skills = [
    "UI/UX Design",
    "Framer Development",
    "Next.js App Architecture",
    "Brand Systems",
    "Interactive Prototypes",
    "Motion Direction",
  ];

  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-[#0D0F14] transition-colors">
      <div className="max-w-5xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Bio Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#6366F1] dark:text-indigo-400">
              ✦ ABOUT ME
            </span>

            <h2 className="text-3xl sm:text-5xl font-black text-black dark:text-white mt-3 leading-tight tracking-tight">
              Crafting Digital Experiences <br />
              With Purpose & Elegance.
            </h2>

            <p className="mt-6 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              I am Duncan Robert, a digital designer and Framer specialist focused on transforming complex ideas into clean, functional, and visually striking web interfaces.
            </p>

            <p className="mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Whether building full-scale design systems or interactive landing pages, my work balances aesthetic beauty with high performance.
            </p>

            {/* Skill Pills */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-1 gap-4"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="p-6 rounded-3xl bg-[#F8F9FA] dark:bg-[#13161F] border border-gray-200 dark:border-gray-800 flex items-center justify-between shadow-sm"
              >
                <div>
                  <h3 className="text-4xl font-black text-black dark:text-white font-display">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
                    {stat.label}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center font-bold">
                  ✦
                </div>
              </div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
