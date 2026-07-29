export interface ProfileData {
  name: string;
  title: string;
  shortRole: string;
  avatar: string;
  location: string;
  email: string;
  phone: string;
  bio: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  education: Array<{
    degree: string;
    institution: string;
    grade: string;
    description: string;
  }>;
  skills: string[];
  technicalSkills: string[];
  tools: string[];
  socials: {
    linkedin: string;
    behance: string;
    github: string;
    instagram?: string;
    twitter?: string;
    dribbble?: string;
  };
  stats: Array<{
    value: string;
    label: string;
  }>;
  services: Array<{
    id: string;
    title: string;
    description: string;
    tags: string[];
  }>;
}

export const profileData: ProfileData = {
  name: "Nivetha Velusamy",
  title: "UI/UX Designer & Visual Designer & Front-End Developer",
  shortRole: "UI/UX & Front-End Developer",
  avatar: "/images/Profile.png",
  location: "Punjai Puliampatti, Coimbatore, India",
  email: "nivethav012@gmail.com",
  phone: "+91 9677700740",
  bio: "Professional B.Tech graduate and skilled UI/UX Designer with a strong foundation in design principles and user-centered solutions. Experienced in creating intuitive interfaces, engaging visuals, and enhancing digital experiences with a focus on usability and visual consistency.",
  heroTitle: "UI / UX DESIGNER",
  heroSubtitle: "Crafting intuitive, user-centered digital solutions with clean visuals and front-end code.",
  heroTagline: "NIVETHA VELUSAMY — PORTFOLIO",
  education: [
    {
      degree: "B.Tech (Information Technology)",
      institution: "Dr. N.G.P. Institute of Technology, Coimbatore",
      grade: "CGPA - 7.87",
      description: "Focused on software engineering, web technologies, database management systems, and interactive digital design.",
    },
    {
      degree: "UI/UX and Graphic Design Certification",
      institution: "Fortune Innovatives, Coimbatore",
      grade: "A Grade",
      description: "Skilled in end-to-end UI/UX design, from user research, competitor analysis, and wireframing to prototyping and high-fidelity design.",
    },
  ],
  skills: [
    "UX Research",
    "Wireframing",
    "Prototyping",
    "Competitor Analysis",
    "Usability Testing",
    "User Interviews",
    "User Flow",
    "Design Solutions",
    "Logo Design",
    "Iconography",
    "Typography",
    "Brand Identity",
  ],
  technicalSkills: [
    "HTML & CSS",
    "JavaScript",
    "MySQL",
    "React JS",
    "Node JS",
    "C & Java (Basic)",
  ],
  tools: [
    "Figma",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Adobe XD",
    "Balsamiq",
    "Miro",
    "Visual Studio Code",
  ],
  socials: {
    linkedin: "https://www.linkedin.com/",
    behance: "https://www.behance.net/",
    github: "https://github.com/",
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/",
    dribbble: "https://dribbble.com/",
  },
  stats: [
    { value: "5+", label: "Featured Projects" },
    { value: "A Grade", label: "UI/UX Certified" },
    { value: "7.87", label: "B.Tech CGPA" },
  ],
  services: [
    {
      id: "ui_ux_design",
      title: "UI / UX Product Design",
      description: "User research, wireframing, interactive prototyping, and pixel-perfect high-fidelity interface design.",
      tags: ["Figma", "User Flow", "Wireframes", "Prototypes"],
    },
    {
      id: "front_end_dev",
      title: "Front-End Development",
      description: "Building responsive, modern, fast web applications using React JS, Next.js, HTML5, CSS3, and JavaScript.",
      tags: ["React JS", "Next.js", "JavaScript", "HTML/CSS"],
    },
    {
      id: "graphic_branding",
      title: "Logo & Brand Identity",
      description: "Crafting visual identities, brand guidelines, color systems, typography scale, and logo mockups.",
      tags: ["Adobe Illustrator", "Photoshop", "Branding", "Iconography"],
    },
  ],
};
