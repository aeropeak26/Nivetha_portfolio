"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Mail, Phone, MapPin } from "lucide-react";
import { profileData } from "@/data/profileData";

export default function PortaviaContact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 px-4 bg-[#F8F9FA] text-[#0F1115] border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Portrait Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-64 sm:w-80 aspect-[3/4] rounded-[36px] overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-200 bg-white transform -rotate-2 hover:rotate-0 transition-transform duration-500 group">
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

          {/* Right Lead Capture Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              ✦ GET IN TOUCH
            </span>

            <h2 className="text-4xl sm:text-5xl font-black text-[#0F1115] uppercase tracking-tighter font-display leading-tight mt-1">
              LET'S WORK TOGETHER
            </h2>

            <p className="mt-3 text-xs sm:text-sm text-gray-600 font-medium leading-relaxed max-w-lg">
              Have a project in mind, need a full UI/UX overhaul, or want to discuss a design role? Send me a message and I'll get back to you promptly.
            </p>

            {submitted ? (
              <div className="mt-8 p-6 rounded-3xl bg-[#EEF2FF] border border-indigo-200 text-[#0F1115] flex items-center gap-3 shadow-md">
                <CheckCircle2 className="w-6 h-6 text-indigo-600 shrink-0" />
                <p className="text-xs sm:text-sm font-bold text-indigo-950">
                  Thank you! Your message has been sent. Nivetha will reply to your email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 text-xs sm:text-sm text-[#0F1115] focus:outline-none focus:border-indigo-600 transition-colors shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 text-xs sm:text-sm text-[#0F1115] focus:outline-none focus:border-indigo-600 transition-colors shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Service / Topic
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 text-xs sm:text-sm text-[#0F1115] focus:outline-none focus:border-indigo-600 transition-colors shadow-sm"
                  >
                    <option value="">Select service...</option>
                    <option value="ui_ux">UI / UX Web & Mobile Design</option>
                    <option value="frontend">Front-End Development (React / HTML / CSS)</option>
                    <option value="branding">Graphic & Logo Branding</option>
                    <option value="other">Full-Time / Contract Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-white border border-gray-200 text-xs sm:text-sm text-[#0F1115] focus:outline-none focus:border-indigo-600 transition-colors shadow-sm"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-[#0F1115] text-white font-bold text-xs uppercase tracking-wider hover:bg-indigo-600 transition-all active:scale-95 shadow-md"
                  >
                    SEND MESSAGE
                  </button>
                </div>
              </form>
            )}
          </motion.div>

        </div>

        {/* Bottom Details Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-gray-600 font-medium">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-indigo-600" />
            <div>
              <span className="text-gray-400 block text-[11px]">Email</span>
              <a href={`mailto:${profileData.email}`} className="font-bold text-[#0F1115] text-sm hover:text-indigo-600">
                {profileData.email}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-indigo-600" />
            <div>
              <span className="text-gray-400 block text-[11px]">Call / WhatsApp</span>
              <p className="font-bold text-[#0F1115] text-sm">{profileData.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-indigo-600" />
            <div>
              <span className="text-gray-400 block text-[11px]">Location</span>
              <p className="font-bold text-[#0F1115] text-sm">{profileData.location}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
