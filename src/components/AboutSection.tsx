"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 md:px-6 bg-[#08090A]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Headline Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5FE00]/10 border border-[#E5FE00]/20 text-[#E5FE00] text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Nivi Portfolio</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              Turning ideas into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5FE00] via-[#D4F82C] to-white">
                Masterpieces
              </span>
            </h2>

            <p className="mt-6 text-gray-300 text-base md:text-lg leading-relaxed font-normal">
              Many brands struggle to communicate their value clearly. Inconsistent visuals, weak messaging, and poor user experience cost trust, attention, and revenue.
            </p>

            <p className="mt-4 text-gray-400 text-sm md:text-base leading-relaxed">
              We bridge the gap between vision and impact by crafting web applications and visual identities that are strategic, intentional, and engineered for scalable business growth.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Strategic User Experience",
                "High Performance Code",
                "Conversion Focused",
                "Scalable Architecture",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm font-semibold text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-[#E5FE00] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image Grid Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 grid grid-cols-2 gap-4"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <Image
                src="/images/agency_workspace.png"
                alt="Nivi Agency Team Workspace"
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/90 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-bold text-white uppercase tracking-wider">
                Creative Studio
              </div>
            </div>

            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group mt-8">
              <Image
                src="/images/hero_portrait.png"
                alt="Engineering & Design Collaboration"
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E]/90 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-bold text-white uppercase tracking-wider">
                Precision Design
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
