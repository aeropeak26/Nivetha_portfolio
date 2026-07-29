export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const faqsData: FaqItem[] = [
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
    answer: "Simply fill out the contact form below or email me directly at nivethav012@gmail.com to schedule an initial discovery chat!",
  },
];
