export interface ServiceItem {
  id: string;
  title: string;
  items: string[];
  image: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "01",
    title: "1. UI/UX DESIGN",
    items: [
      "User research and persona mapping",
      "Wireframing & interactive prototypes",
      "Design systems & component libraries",
      "Usability testing & conversion optimization",
    ],
    image: "/images/agency_workspace.png",
  },
  {
    id: "02",
    title: "2. GRAPHIC DESIGN",
    items: [
      "Logo and brand identity design",
      "Social media graphics and ad creatives",
      "Infographics and data visualization",
      "Custom illustrations and icons",
    ],
    image: "/images/project_1.png",
  },
  {
    id: "03",
    title: "3. WEB DEVELOPMENT",
    items: [
      "Custom Next.js & React website design",
      "Responsive layout for mobile & desktop",
      "High performance & SEO optimization",
      "Scroll animations & micro-interactions",
    ],
    image: "/images/project_shopease.png",
  },
  {
    id: "04",
    title: "4. BRANDING & IDENTITY",
    items: [
      "Comprehensive brand strategy & positioning",
      "Color palettes & typography scale",
      "Brand voice & messaging guidelines",
      "Marketing collateral & pitch deck design",
    ],
    image: "/images/project_coral_spiral.png",
  },
];
