"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projectsData";
import {
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Layers,
  Palette,
  CheckCircle2,
  Maximize2,
  Monitor,
  Smartphone,
  Copy,
  Check,
} from "lucide-react";

interface ProjectDetailClientProps {
  project: Project;
  prevProject: Project;
  nextProject: Project;
}

export default function ProjectDetailClient({
  project,
  prevProject,
  nextProject,
}: ProjectDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"showcase" | "figma" | "simulator">("figma");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <article className="pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto w-full flex-grow">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6">
        <Link href="/" className="hover:text-indigo-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/projects" className="hover:text-indigo-600 transition-colors">
          Projects
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-bold truncate max-w-[200px]">
          {project.title}
        </span>
      </div>

      {/* Hero Header Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <span className="px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider">
            {project.category}
          </span>

          <span className="text-xs font-bold text-gray-400">
            Role: <strong className="text-gray-800">{project.role}</strong>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0F1115] uppercase tracking-tighter font-display leading-tight">
          {project.title}
        </h1>

        <p className="mt-3 text-sm sm:text-base text-gray-600 font-medium leading-relaxed max-w-3xl">
          {project.subtitle}
        </p>

        {/* Project Meta Info Grid */}
        <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
          <div>
            <span className="text-gray-400 font-semibold block mb-1">Timeline</span>
            <span className="font-bold text-gray-900">{project.timeline}</span>
          </div>

          <div>
            <span className="text-gray-400 font-semibold block mb-1">Deliverables</span>
            <span className="font-bold text-gray-900">UI/UX & Prototype</span>
          </div>

          <div>
            <span className="text-gray-400 font-semibold block mb-1">Primary Tool</span>
            <span className="font-bold text-indigo-600">Figma</span>
          </div>

          <div>
            <span className="text-gray-400 font-semibold block mb-1">Design System</span>
            <span className="font-bold text-gray-900">Custom Tokens</span>
          </div>
        </div>

        {/* Tools Tags & Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 rounded-lg bg-gray-100 text-gray-800 text-xs font-semibold"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.figmaUrl !== "#" && (
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white text-xs font-extrabold uppercase tracking-wider hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95"
              >
                <span>Open in Figma</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <a
              href="#live-preview"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F1115] text-white text-xs font-extrabold uppercase tracking-wider hover:bg-gray-800 transition-all shadow-md active:scale-95"
            >
              <span>Live Interactive Preview</span>
            </a>
          </div>
        </div>
      </div>


      {/* LIVE PREVIEW SECTION */}
      <section id="live-preview" className="mb-16 scroll-mt-28">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
          
          {/* Header Controls */}
          <div className="px-6 py-4 bg-gray-900 text-white flex flex-wrap items-center justify-between gap-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs font-bold text-gray-300 ml-2">
                Live Interactive Preview Mode
              </span>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 bg-gray-800 p-1 rounded-xl">
              {project.figmaEmbedUrl && (
                <button
                  onClick={() => setActiveTab("figma")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "figma"
                      ? "bg-indigo-600 text-white shadow"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Figma Embed
                </button>
              )}

              <button
                onClick={() => setActiveTab("showcase")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "showcase"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                High-Res Visual
              </button>

              <button
                onClick={() => setActiveTab("simulator")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "simulator"
                    ? "bg-indigo-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Mockup Frame
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="relative min-h-[500px] lg:min-h-[650px] bg-gray-950 flex items-center justify-center p-4">
            
            {activeTab === "figma" && project.figmaEmbedUrl ? (
              <div className="w-full h-[550px] lg:h-[700px] relative rounded-2xl overflow-hidden border border-gray-800">
                <iframe
                  title={`${project.title} Figma Embed`}
                  src={project.figmaEmbedUrl}
                  className="w-full h-full border-none"
                  allowFullScreen
                />
              </div>
            ) : activeTab === "showcase" ? (
              <div className="relative w-full aspect-[16/9] max-h-[700px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={project.image}
                  alt={`${project.title} Visual Showcase`}
                  fill
                  className="object-contain bg-gray-900"
                />
              </div>
            ) : (
              /* Simulator Mockup Frame */
              <div className="relative max-w-4xl w-full mx-auto my-6 bg-gray-900 rounded-3xl p-4 sm:p-6 border-4 border-gray-800 shadow-2xl">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-800 text-gray-400 text-xs">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-indigo-400" />
                    <span className="font-semibold text-gray-200">Interactive Preview Frame</span>
                  </div>
                  {project.figmaUrl !== "#" && (
                    <a
                      href={project.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                    >
                      <span>Figma Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black shadow-inner">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Bottom Note */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 text-center text-xs text-gray-600 font-medium">
            💡 <strong>Tip:</strong> You can interact directly with the embedded canvas or click the Figma button to inspect all frames, components, and wireframes in Figma.
          </div>

        </div>
      </section>


      {/* UX CASE STUDY DETAILED BODY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Problem, Solution & Research */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Problem Statement */}
          <section className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 block mb-1">
              01. THE CHALLENGE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1115] font-display">
              Problem Statement
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
              {project.problemStatement}
            </p>
          </section>

          {/* Solution Overview */}
          <section className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-1">
              02. THE APPROACH & SOLUTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1115] font-display">
              Design Solution
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
              {project.solution}
            </p>

            {/* Research Highlights List */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-3">
                Research Insights & UX Methodology
              </h3>
              <ul className="space-y-2.5">
                {project.researchHighlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Key Features Breakdown */}
          <section className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-1">
              03. CORE FUNCTIONALITY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1115] font-display mb-6">
              Key Application Features
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.keyFeatures.map((feat, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs mb-3">
                    0{idx + 1}
                  </div>
                  <h4 className="text-sm font-extrabold text-[#0F1115]">
                    {feat.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-gray-600 font-medium leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Design System & Color Swatches */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Color Palette Swatches */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#0F1115]">
                Color Palette & Tokens
              </h3>
            </div>

            <div className="space-y-3">
              {project.colorPalette.map((color) => (
                <div
                  key={color.hex}
                  onClick={() => copyToClipboard(color.hex)}
                  className="group flex items-center justify-between p-3 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-xl shadow-inner border border-black/10 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div>
                      <span className="text-xs font-bold text-gray-900 block leading-tight">
                        {color.name}
                      </span>
                      <span className="text-[11px] font-mono text-gray-500">
                        {color.hex}
                      </span>
                    </div>
                  </div>

                  <button className="text-gray-400 group-hover:text-indigo-600 transition-colors">
                    {copiedHex === color.hex ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            <p className="mt-3 text-[10px] text-gray-400 text-center font-medium">
              Click any color swatch to copy its HEX code
            </p>
          </div>

          {/* Designer Card */}
          <div className="bg-gradient-to-br from-[#0F1115] to-indigo-950 text-white p-6 rounded-3xl shadow-xl">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400 block mb-2">
              DESIGN CREATOR
            </span>
            <h4 className="text-lg font-extrabold">Nivetha Velusamy</h4>
            <p className="text-xs text-gray-300 mt-1">
              UI/UX Designer & Front-End Developer
            </p>
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-2 text-xs">
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-center transition-colors"
              >
                Inspect Figma Canvas
              </a>
              <Link
                href="/projects"
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-center transition-colors"
              >
                Back to All Projects
              </Link>
            </div>
          </div>

        </div>

      </div>


      {/* NEXT & PREVIOUS PROJECT FOOTER */}
      <div className="mt-20 pt-10 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Prev Project */}
        <Link
          href={`/projects/${prevProject.id}`}
          className="group p-6 rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-800 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
              Previous Case Study
            </span>
            <h4 className="text-base font-extrabold text-[#0F1115] group-hover:text-indigo-600 transition-colors line-clamp-1">
              {prevProject.title}
            </h4>
          </div>
        </Link>

        {/* Next Project */}
        <Link
          href={`/projects/${nextProject.id}`}
          className="group p-6 rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-between gap-4 text-right"
        >
          <div className="w-full">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
              Next Case Study
            </span>
            <h4 className="text-base font-extrabold text-[#0F1115] group-hover:text-indigo-600 transition-colors line-clamp-1">
              {nextProject.title}
            </h4>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-800 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
            <ArrowRight className="w-5 h-5" />
          </div>
        </Link>

      </div>

    </article>
  );
}
