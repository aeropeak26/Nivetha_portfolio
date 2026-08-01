"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { profileData as fallbackProfile, ProfileData } from "@/data/profileData";
import { projectsData as fallbackProjects, Project } from "@/data/projectsData";
import { ArrowRight, Sparkles, FolderKanban, Star } from "lucide-react";

export default function PortaviaHero() {
  const [profile, setProfile] = useState<ProfileData>(fallbackProfile);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/profile");
        const json = await res.json();

        if (json.success && json.data) {
          setProfile((prev) => ({ ...prev, ...json.data }));
        }
      } catch (e) {
        console.error("Failed to fetch dynamic hero profile data", e);
      }
    }
    loadData();
  }, []);

  // Split title intelligently (e.g. "UI / UX DESIGNER" -> Left: "UI / UX", Right: "DESIGNER")
  const fullTitle = profile.heroTitle || "UI / UX DESIGNER";
  let leftTitle = "UI / UX";
  let rightTitle = "DESIGNER";

  if (fullTitle.includes("UI / UX")) {
    leftTitle = "UI / UX";
    rightTitle = fullTitle.replace("UI / UX", "").trim() || "DESIGNER";
  } else if (fullTitle.includes(" ")) {
    const parts = fullTitle.split(" ");
    leftTitle = parts[0];
    rightTitle = parts.slice(1).join(" ");
  }

  return (
    <section id="hero" className="min-h-screen pt-28 pb-16 px-4 sm:px-8 flex flex-col justify-center items-center relative overflow-hidden bg-white text-[#0F1115]">
      
      {/* Background Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-100/60 via-purple-100/40 to-pink-100/30 blur-3xl pointer-events-none rounded-full" />

      {/* Floating Tool Badges */}
      
      {/* 1. Figma Expert Badge (Top Left) */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 left-6 sm:left-12 lg:left-20 z-20 hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl text-xs font-bold text-gray-800"
      >
        <div className="w-7 h-7 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
          ❖
        </div>
        <span>Figma Specialist</span>
      </motion.div>

      {/* 2. UI/UX Certified Badge (Mid Left) */}
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [2, -2, 2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-32 left-6 sm:left-12 lg:left-20 z-20 hidden md:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl text-xs font-bold text-gray-800"
      >
        <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
          ✓
        </div>
        <span>UI/UX Certified (Grade A)</span>
      </motion.div>

      {/* 3. Front-End Dev Badge (Top Right) */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [2, -2, 2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-32 right-6 sm:right-12 lg:right-20 z-20 hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl text-xs font-bold text-gray-800"
      >
        <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-xs">
          {"</>"}
        </div>
        <span>Front-End Dev</span>
      </motion.div>

      {/* 4. Adobe Tools Badge (Mid Right) */}
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-32 right-6 sm:right-12 lg:right-20 z-20 hidden md:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl text-xs font-bold text-gray-800"
      >
        <div className="w-7 h-7 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-black text-xs">
          Ai
        </div>
        <span>Adobe Illustrator & PS</span>
      </motion.div>


      {/* Hero Container */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center my-auto relative z-10 px-2 sm:px-6">
        
        {/* Display Title Grid: [ Left Title: UI / UX ] [ Center Card ] [ Right Title: DESIGNER ] */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
          
          {/* Left Title: UI / UX */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-right shrink-0"
          >
            <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[5.5rem] xl:text-[7rem] font-black tracking-tighter text-[#0F1115] uppercase leading-none font-display">
              {leftTitle}
            </h1>
          </motion.div>

          {/* Center Profile Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-64 sm:w-80 md:w-96 lg:w-[340px] xl:w-[380px] aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-200/80 shrink-0 my-4 lg:my-0 group bg-gray-100"
          >
            <Image
              src={profile.avatar || "/images/Profile.png"}
              alt={profile.name || "Nivetha Velusamy"}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <span className="text-white text-xs font-bold tracking-wide">
                {profile.name} — {profile.shortRole}
              </span>
            </div>
          </motion.div>

          {/* Right Title */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start shrink-0"
          >
            <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[5.5rem] xl:text-[7rem] font-black tracking-tighter text-[#0F1115] uppercase leading-none font-display">
              {rightTitle}
            </h1>
          </motion.div>

        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0F1115] text-white text-xs font-bold uppercase tracking-wider hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-500/20 active:scale-95"
          >
            <FolderKanban className="w-4 h-4" />
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-gray-300 text-gray-800 text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-all shadow-sm active:scale-95"
          >
            <span>Get In Touch</span>
          </a>
        </motion.div>

      </div>

    </section>
  );
}
