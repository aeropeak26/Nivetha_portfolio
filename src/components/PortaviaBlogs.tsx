"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const articles = [
  {
    title: "5 DESIGN TRENDS THAT WILL DEFINE 2024",
    category: "Insights",
    date: "Apr 30, 2025",
    description: "Explore the top design trends for 2024 that will influence web, UI/UX, and branding projects, helping you stay ahead of the curve.",
    image: "/images/project_summer_vibes.png",
  },
  {
    title: "HOW TO STREAMLINE YOUR DESIGN WORKFLOW",
    category: "Tutorials",
    date: "Apr 27, 2025",
    description: "Discover practical strategies to improve your design process, save time, and deliver quality work more efficiently.",
    image: "/images/agency_workspace.png",
  },
];

export default function PortaviaBlogs() {
  return (
    <section id="blogs" className="py-24 px-4 bg-white text-[#0F1115]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-6xl font-bold text-[#0F1115] uppercase tracking-tighter font-display">
            DESIGN INSIGHTS & IDEAS
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            From design trends to creative processes, these articles offer insights to help you elevate your craft, solve challenges, and spark new ideas for your projects.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-[#F8F9FA] border border-gray-200 rounded-[32px] overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-xl transition-all"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-extrabold uppercase text-[#0F1115] shadow-sm">
                      {article.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-white">
                      {article.date}
                    </span>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="absolute bottom-4 right-4">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-[#6366F1] text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform"
                      aria-label="Read Article"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold uppercase font-display tracking-tight text-[#0F1115] group-hover:text-[#6366F1] transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
                    {article.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="mt-14 text-center">
          <a
            href="#blogs"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-[#0F1115] text-xs font-bold tracking-widest uppercase text-[#0F1115] hover:bg-[#0F1115] hover:text-white transition-all shadow-md active:scale-95"
          >
            BROWSE ALL INSIGHTS
          </a>
        </div>

      </div>
    </section>
  );
}
