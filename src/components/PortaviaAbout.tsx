"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profileData } from "@/data/profileData";
import { Mail, Phone, MapPin, GraduationCap, Award, CheckCircle2 } from "lucide-react";

export default function PortaviaAbout() {
  return (
    <section id="about" className="py-24 px-4 bg-white text-[#0F1115] border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              ✦ ABOUT ME & CREDENTIALS
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold text-[#0F1115] uppercase tracking-tighter font-display leading-tight mt-1">
              NIVETHA VELUSAMY
            </h2>

            <p className="mt-2 text-sm sm:text-base text-indigo-600 font-semibold">
              {profileData.title}
            </p>

            <p className="mt-4 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
              {profileData.bio}
            </p>

            {/* Metrics Row */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-y border-gray-200 py-6">
              {profileData.stats.map((stat) => (
                <div key={stat.label}>
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#0F1115] font-display">
                    {stat.value}
                  </span>
                  <p className="text-[11px] text-gray-500 font-semibold mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Education & Certification Cards */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400">
                EDUCATION & CERTIFICATION
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                    <GraduationCap className="w-4 h-4" />
                    <span>B.Tech (Information Technology)</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800 mt-1">
                    Dr. N.G.P. Institute of Technology
                  </p>
                  <p className="text-[11px] text-emerald-600 font-bold mt-1">
                    CGPA: 7.87
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                    <Award className="w-4 h-4" />
                    <span>UI/UX & Graphic Design</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800 mt-1">
                    Fortune Innovatives, Coimbatore
                  </p>
                  <p className="text-[11px] text-emerald-600 font-bold mt-1">
                    Certified with A Grade
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact Info */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 font-medium block">Phone</span>
                  <span className="font-bold text-gray-800">{profileData.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 font-medium block">Email</span>
                  <span className="font-bold text-gray-800 truncate block max-w-[140px]">
                    {profileData.email}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-gray-400 font-medium block">Location</span>
                  <span className="font-bold text-gray-800">Coimbatore, TN</span>
                </div>
              </div>
            </div>

            {/* Core Skills Chips */}
            <div className="mt-8">
              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-400 block mb-3">
                KEY SKILLS & COMPETENCIES
              </span>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.slice(0, 8).map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-800 text-xs font-semibold"
                  >
                    <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right Tilted Profile Image Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-72 sm:w-88 aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-200 bg-[#F8F9FA] transform rotate-2 hover:rotate-0 transition-transform duration-500 group">
              <Image
                src={profileData.avatar}
                alt={profileData.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-sm font-bold">{profileData.name}</p>
                  <p className="text-xs text-gray-200">UI/UX & Front-End Developer</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
