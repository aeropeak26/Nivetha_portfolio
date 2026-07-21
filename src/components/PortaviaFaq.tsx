"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "1. WHAT SERVICES DO YOU OFFER?",
    answer: "I specialize in UI/UX Design, Web Application Development (Next.js & React), Brand Identity Design, Framer Motion Animations, and Design System Architecture.",
  },
  {
    id: 2,
    question: "2. HOW DOES THE DESIGN PROCESS WORK?",
    answer: "Our process begins with a discovery session to align on goals, followed by wireframing, interactive UI prototypes, iteration cycles based on your feedback, and final high-performance deployment.",
  },
  {
    id: 3,
    question: "3. HOW LONG DOES A PROJECT USUALLY TAKE?",
    answer: "Typical project timelines range from 2 to 4 weeks depending on scope, complexity, and feature requirements.",
  },
  {
    id: 4,
    question: "4. WHAT DO I NEED TO PROVIDE BEFORE STARTING A PROJECT?",
    answer: "You'll just need your project goals, any existing brand assets or logos, and content outline. I will guide you through everything else!",
  },
  {
    id: 5,
    question: "5. DO YOU OFFER REVISIONS?",
    answer: "Yes, all design packages include dedicated revision rounds to ensure the final product perfectly aligns with your expectations.",
  },
  {
    id: 6,
    question: "6. HOW DO I GET STARTED?",
    answer: "Simply fill out the contact form below or email me directly at designer@example.com to schedule an initial discovery chat!",
  },
];

export default function PortaviaFaq() {
  const [openId, setOpenId] = useState<number>(3); // 3 opened by default as seen in video 00:22

  return (
    <section className="py-24 px-4 bg-[#FFFFFF] dark:bg-[#0B0C0E] transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Title Column */}
          <div className="lg:col-span-5">
            <h2 className="text-4xl sm:text-5xl font-black text-black dark:text-white uppercase tracking-tighter font-display leading-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>

            <p className="mt-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              Here are answers to some of the most common questions I receive as a freelance designer. If you don't see your question here, feel free to reach out — I'm happy to help!
            </p>
          </div>

          {/* Right Accordion Q&A Column (Video 00:22) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border-b border-gray-200 dark:border-gray-800 pb-4"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? 0 : faq.id)}
                    className="w-full flex items-center justify-between py-2 text-left group"
                  >
                    <span
                      className={`text-base sm:text-lg font-extrabold uppercase font-display tracking-tight transition-colors ${
                        isOpen
                          ? "text-[#6366F1] dark:text-[#A3E635]"
                          : "text-black dark:text-white group-hover:text-[#6366F1] dark:group-hover:text-[#A3E635]"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180 text-[#6366F1] dark:text-[#A3E635]"
                          : "text-gray-400"
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed pr-6"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
