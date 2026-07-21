"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "John Harris",
    role: "Marketing Director",
    quote: "Duncan truly understood my vision and turned it into impactful designs. The results went beyond my expectations!",
    avatar: "/images/hero_portrait.png",
  },
  {
    name: "Michael Lee",
    role: "Product Manager",
    quote: "He took the time to understand our goals and delivered a design that resonated perfectly with our audience.",
    avatar: "/images/duncan_portrait.png",
  },
  {
    name: "Sarah Johnson",
    role: "CEO",
    quote: "His design skills are unmatched. He transformed my ideas into a high-performing, visually striking website.",
    avatar: "/images/agency_workspace.png",
  },
  {
    name: "Laura Bennett",
    role: "Small Business Owner",
    quote: "As a small business owner, I appreciated how stress-free Duncan made the process.",
    avatar: "/images/hero_portrait.png",
  },
];

export default function PortaviaTestimonials() {
  return (
    <section className="py-24 px-4 bg-[#F8F9FA] dark:bg-[#090A0F] transition-colors">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-4xl sm:text-6xl font-black text-black dark:text-white uppercase tracking-tighter font-display">
            WHAT MY CLIENTS SAY
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
            Here's what my clients have shared about their experiences working with me. Their trust and satisfaction motivate me to continue delivering designs that make an impact.
          </p>
        </div>

        {/* Bento Grid (As seen in video 00:20 - 00:21) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Review Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-3xl bg-white dark:bg-[#13151A] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex text-amber-400 text-sm mb-3">★★★★★</div>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium italic leading-relaxed">
                "{testimonials[0].quote}"
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                <Image src={testimonials[0].avatar} alt={testimonials[0].name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-black dark:text-white">{testimonials[0].name}</h4>
                <p className="text-[11px] text-gray-400">{testimonials[0].role}</p>
              </div>
            </div>
          </motion.div>

          {/* Review Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-3xl bg-white dark:bg-[#13151A] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex text-amber-400 text-sm mb-3">★★★★★</div>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium italic leading-relaxed">
                "{testimonials[1].quote}"
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                <Image src={testimonials[1].avatar} alt={testimonials[1].name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-black dark:text-white">{testimonials[1].name}</h4>
                <p className="text-[11px] text-gray-400">{testimonials[1].role}</p>
              </div>
            </div>
          </motion.div>

          {/* Stat Card 1: 98% Satisfaction (Video 00:21) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-3xl bg-black dark:bg-[#1A1D27] text-white border border-gray-800 shadow-md flex flex-col justify-between"
          >
            <span className="text-xs text-gray-400 font-medium">I've worked with 50+ happy clients</span>
            <div className="mt-6">
              <span className="text-5xl font-black text-[#6366F1] dark:text-[#A3E635] font-display">
                98%
              </span>
              <p className="text-xs text-gray-300 font-semibold mt-1">Satisfaction Rate</p>
            </div>
          </motion.div>

          {/* Stat Card 2: 200% Growth (Video 00:21) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-3xl bg-black dark:bg-[#1A1D27] text-white border border-gray-800 shadow-md flex flex-col justify-between"
          >
            <span className="text-xs text-gray-400 font-medium">My work helped clients grow their revenue by 200%</span>
            <div className="mt-6">
              <span className="text-5xl font-black text-[#6366F1] dark:text-[#A3E635] font-display">
                200%
              </span>
              <p className="text-xs text-gray-300 font-semibold mt-1">Growth</p>
            </div>
          </motion.div>

          {/* Review Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-3xl bg-white dark:bg-[#13151A] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex text-amber-400 text-sm mb-3">★★★★★</div>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium italic leading-relaxed">
                "{testimonials[2].quote}"
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                <Image src={testimonials[2].avatar} alt={testimonials[2].name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-black dark:text-white">{testimonials[2].name}</h4>
                <p className="text-[11px] text-gray-400">{testimonials[2].role}</p>
              </div>
            </div>
          </motion.div>

          {/* Review Card 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-3xl bg-white dark:bg-[#13151A] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex text-amber-400 text-sm mb-3">★★★★★</div>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium italic leading-relaxed">
                "{testimonials[3].quote}"
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                <Image src={testimonials[3].avatar} alt={testimonials[3].name} fill className="object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-black dark:text-white">{testimonials[3].name}</h4>
                <p className="text-[11px] text-gray-400">{testimonials[3].role}</p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
