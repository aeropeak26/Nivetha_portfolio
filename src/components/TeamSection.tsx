"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code, Globe, Mail, ArrowUpRight } from "lucide-react";

const teamMembers = [
  {
    name: "Caleb Norris",
    role: "Creative Director",
    bio: "Pioneering visual direction and brand strategy for Fortune 500 tech clients.",
    image: "/images/hero_portrait.png",
  },
  {
    name: "Ava Reynolds",
    role: "Head of Design",
    bio: "Crafting intuitive digital interfaces and human-centered design systems.",
    image: "/images/agency_workspace.png",
  },
  {
    name: "Daniel Okoye",
    role: "Lead Developer",
    bio: "Specializing in high-throughput Next.js architectures and micro-frontend apps.",
    image: "/images/hero_portrait.png",
  },
  {
    name: "Sofia Martinez",
    role: "Brand Strategist",
    bio: "Translating complex business concepts into memorable visual identities.",
    image: "/images/agency_workspace.png",
  },
  {
    name: "Marcus Lee",
    role: "Motion Architect",
    bio: "Expert in webGL, Framer Motion, and micro-interaction animations.",
    image: "/images/hero_portrait.png",
  },
  {
    name: "Tunde Adeyemi",
    role: "Full Stack Engineer",
    bio: "Building robust cloud solutions, database systems, and real-time APIs.",
    image: "/images/agency_workspace.png",
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="py-20 px-4 md:px-6 bg-[#08090A]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5FE00] text-[#0B0C0E] text-xs font-black uppercase tracking-wider mb-4">
            ✦ Meet Our Experts
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            The Minds Behind <br />
            <span className="text-[#E5FE00]">The Magic</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-400 font-medium">
            A diverse collective of designers, engineers, and creative thinkers dedicated to pushing digital boundaries.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-[#131518] border border-white/10 rounded-2xl p-6 hover:border-[#E5FE00]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(229,254,0,0.1)] flex flex-col justify-between"
            >
              <div>
                {/* Avatar */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden mb-5 border-2 border-[#E5FE00]/30 group-hover:border-[#E5FE00] transition-colors">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <h3 className="text-xl font-black text-white group-hover:text-[#E5FE00] transition-colors">
                  {member.name}
                </h3>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-white/5 text-xs text-[#E5FE00] font-semibold">
                  {member.role}
                </span>
                <p className="mt-4 text-xs md:text-sm text-gray-400 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-gray-400">
                <div className="flex gap-3">
                  <a href="#" className="hover:text-[#E5FE00] transition-colors" aria-label="Website">
                    <Globe className="w-4 h-4" />
                  </a>
                  <a href="#" className="hover:text-[#E5FE00] transition-colors" aria-label="Code">
                    <Code className="w-4 h-4" />
                  </a>
                  <a href="#" className="hover:text-[#E5FE00] transition-colors" aria-label="Email">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-[#E5FE00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
