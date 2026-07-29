"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { testimonialsData as fallbackTestimonials, TestimonialItem } from "@/data/testimonialsData";

export default function PortaviaTestimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(fallbackTestimonials);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await fetch("/api/testimonials");
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setTestimonials(json.data);
        }
      } catch (e) {
        console.error("Failed to load testimonials", e);
      }
    }
    loadTestimonials();
  }, []);

  return (
    <section className="py-24 px-4 bg-white text-[#0F1115]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            ✦ CLIENT TESTIMONIALS
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-[#0F1115] uppercase tracking-tighter font-display mt-1">
            WHAT MY CLIENTS SAY
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Here's feedback from founders, product leaders, and design directors who have collaborated with me.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-3xl bg-[#F8F9FA] border border-gray-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex text-amber-400 text-sm mb-3">
                  {"★".repeat(item.rating || 5)}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-medium italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-200">
                  <Image
                    src={item.avatar || "/images/Profile.png"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F1115]">{item.name}</h4>
                  <p className="text-[11px] text-gray-500 font-medium">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Stat Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-3xl bg-[#EEF2FF] border border-indigo-100 text-[#0F1115] shadow-sm flex flex-col justify-between"
          >
            <span className="text-xs text-gray-600 font-medium">Consistently delivering high-impact UI/UX design</span>
            <div className="mt-6">
              <span className="text-5xl font-black text-indigo-600 font-display">
                100%
              </span>
              <p className="text-xs text-gray-800 font-bold mt-1">Client Satisfaction</p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
