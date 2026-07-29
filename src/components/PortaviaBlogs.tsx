"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { blogsData as fallbackBlogs, BlogItem } from "@/data/blogsData";

export default function PortaviaBlogs() {
  const [blogs, setBlogs] = useState<BlogItem[]>(fallbackBlogs);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch("/api/blogs");
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setBlogs(json.data);
        }
      } catch (e) {
        console.error("Failed to load blogs", e);
      }
    }
    loadBlogs();
  }, []);

  return (
    <section id="blogs" className="py-24 px-4 bg-white text-[#0F1115]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            ✦ DESIGN ARTICLES & INSIGHTS
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-[#0F1115] uppercase tracking-tighter font-display mt-1">
            DESIGN INSIGHTS & IDEAS
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            From UX design workflows to visual trends, these articles share practical insights and creative strategies.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((article, index) => (
            <motion.div
              key={article.id || article.title}
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
                    src={article.image || "/images/agency_workspace.png"}
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
                      href={article.link || "#blogs"}
                      className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform"
                      aria-label="Read Article"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-black uppercase font-display tracking-tight text-[#0F1115] group-hover:text-indigo-600 transition-colors">
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

      </div>
    </section>
  );
}
