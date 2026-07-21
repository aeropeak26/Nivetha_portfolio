"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "2000+", label: "Projects Completed" },
  { value: "10+", label: "Years of Team Experience" },
  { value: "800+", label: "Design & Code Assets" },
  { value: "150M+", label: "Reach & User Views" },
];

export default function StatsBar() {
  return (
    <section className="py-10 px-4 md:px-6 bg-[#08090A]">
      <div className="max-w-6xl mx-auto bg-[#131518]/90 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-md">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center group"
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white group-hover:text-[#E5FE00] transition-colors duration-300 tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-gray-400 font-medium mt-2 max-w-[140px] leading-snug">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Divider & Tagline */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-sm md:text-base text-gray-300 font-medium tracking-wide">
            Proven results for startups, entrepreneurs, and established brands worldwide.
          </p>
        </div>
      </div>
    </section>
  );
}
