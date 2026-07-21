"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";

const articles = [
  {
    title: "Designing for Micro-Interactions & Motion in Framer",
    date: "Oct 24, 2025",
    readTime: "4 min read",
    tag: "Design Motion",
  },
  {
    title: "Why Next.js App Router is the Ultimate Choice for Portfolio Sites",
    date: "Nov 12, 2025",
    readTime: "6 min read",
    tag: "Engineering",
  },
  {
    title: "Building Scalable Visual Identity Systems for Tech Brands",
    date: "Dec 05, 2025",
    readTime: "5 min read",
    tag: "Brand Strategy",
  },
];

export default function PortaviaBlogs() {
  return (
    <section id="blogs" className="py-20 px-4 bg-white dark:bg-[#0D0F14] transition-colors">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#6366F1] dark:text-indigo-400">
              ✦ ARTICLES & THOUGHTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-white mt-2">
              Recent Writings
            </h2>
          </div>
        </div>

        {/* Article List */}
        <div className="flex flex-col gap-4">
          {articles.map((article, index) => (
            <motion.a
              key={article.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group p-6 rounded-3xl bg-[#F8F9FA] dark:bg-[#13161F] border border-gray-200 dark:border-gray-800 hover:border-[#6366F1] dark:hover:border-indigo-500 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 font-medium">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#6366F1] dark:text-indigo-400 font-semibold text-[10px]">
                    {article.tag}
                  </span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white group-hover:text-[#6366F1] transition-colors">
                  {article.title}
                </h3>
              </div>

              <div className="w-10 h-10 rounded-full bg-white dark:bg-[#1A1D27] border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 group-hover:bg-[#6366F1] group-hover:text-white group-hover:border-[#6366F1] transition-all shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
