"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsData, Project } from "@/data/projectsData";
import { profileData } from "@/data/profileData";
import PortaviaNavbar from "@/components/PortaviaNavbar";
import Footer from "@/components/Footer";
import { ArrowUpRight, Search, ExternalLink, Filter, Sparkles } from "lucide-react";

export default function ProjectsListPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "UI/UX & Web Design",
    "E-Commerce UI/UX",
    "Mobile App UI/UX",
    "Enterprise UI/UX & Dashboard",
    "Front-End Development",
  ];

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tools.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#0F1115] selection:bg-indigo-600 selection:text-white flex flex-col">
      <PortaviaNavbar />

      {/* Page Header */}
      <section className="pt-32 pb-16 px-4 sm:px-8 bg-white border-b border-gray-200/80">
        <div className="max-w-6xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NIVETHA VELUSAMY — PORTFOLIO</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter font-display text-[#0F1115]">
            ALL FEATURED PROJECTS
          </h1>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Browse through my complete collection of UI/UX design case studies, mobile application mockups, enterprise dashboards, and front-end development projects.
          </p>

          {/* Search & Category Filter Bar */}
          <div className="mt-10 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-72 shrink-0">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by keyword, tool..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-indigo-600 transition-colors shadow-sm"
              />
            </div>

            {/* Horizontal Category Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
                    selectedCategory === cat
                      ? "bg-[#0F1115] text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full flex-grow">
        
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 max-w-md mx-auto p-8">
            <Filter className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-800">No projects found</h3>
            <p className="text-xs text-gray-500 mt-1">
              Try adjusting your search criteria or category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-5 py-2 rounded-full bg-indigo-600 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/95 text-[10px] font-extrabold uppercase tracking-wider text-black shadow-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Figma Link Badge */}
                  {project.figmaUrl !== "#" && (
                    <a
                      href={project.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors backdrop-blur-md"
                      title="View on Figma"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0F1115] group-hover:text-indigo-600 transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-600 font-medium line-clamp-3 leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Tools Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[10px] font-semibold"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-wider"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>

                    <span className="text-[10px] font-bold text-gray-400">
                      {project.role}
                    </span>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </section>

      <Footer />
    </main>
  );
}
