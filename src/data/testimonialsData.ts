export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "test-1",
    name: "John Harris",
    role: "Marketing Director",
    quote: "Nivetha truly understood our vision and turned it into impactful designs. The results went beyond our expectations!",
    avatar: "/images/hero_portrait.png",
    rating: 5,
  },
  {
    id: "test-2",
    name: "Michael Lee",
    role: "Product Manager",
    quote: "She took the time to understand our goals and delivered a design that resonated perfectly with our target audience.",
    avatar: "/images/Profile.png",
    rating: 5,
  },
  {
    id: "test-3",
    name: "Sarah Johnson",
    role: "CEO & Founder",
    quote: "Her design skills are unmatched. She transformed our concept into a high-performing, visually striking web experience.",
    avatar: "/images/agency_workspace.png",
    rating: 5,
  },
  {
    id: "test-4",
    name: "Laura Bennett",
    role: "Business Lead",
    quote: "As a business lead, I appreciated how seamless and stress-free Nivetha made the UI design and prototyping process.",
    avatar: "/images/hero_portrait.png",
    rating: 5,
  },
];
