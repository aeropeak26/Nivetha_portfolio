export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tag: string;
  image: string;
  figmaUrl: string;
  livePreviewUrl?: string;
  role: string;
  timeline: string;
  tools: string[];
  summary: string;
  problemStatement: string;
  solution: string;
  researchHighlights: string[];
  keyFeatures: { title: string; description: string }[];
  colorPalette: { name: string; hex: string }[];
  figmaEmbedUrl: string;
  interactivePreviewType: "figma" | "simulator";
  featuredOnHero?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "realestate-project",
    title: "RealEstate Modern Property Portal",
    subtitle: "End-to-End Real Estate Discovery & Virtual Tour Platform",
    category: "UI/UX & Web Design",
    tag: "Featured Project",
    image: "/images/realestate_preview.png",
    figmaUrl: "https://www.figma.com/design/F2AvhN7yYxGO5ntgoboXBu/realestate-project?node-id=0-1&t=T5GXz5aKnYeTRjy8-1",
    role: "Lead UI/UX Designer",
    timeline: "3 Weeks (User Research to High-Fidelity UI)",
    tools: ["Figma", "Adobe Photoshop", "UX Research", "Wireframing"],
    summary: "A modern real estate portal engineered to revolutionize property browsing, offering intuitive neighborhood filters, high-resolution photo galleries, interactive floor plans, and instant agent scheduling.",
    problemStatement: "Traditional real estate websites overwhelm buyers with complex filters, cluttered property cards, and opaque scheduling procedures, leading to high drop-off rates during initial property research.",
    solution: "Designed a clean, content-first property search platform featuring visual filter chips, instant map view toggles, transparent pricing cards, and a seamless 2-step tour booking modal.",
    researchHighlights: [
      "Conducted 12 user interviews with home buyers and renters to identify key decision factors.",
      "Identified that 78% of users prioritize verified neighborhood insights and floor plan accuracy.",
      "Created 3 distinct buyer personas (First-time Homeowner, Investor, Luxury Buyer).",
      "Mapped out user journey flows to reduce property tour booking time from 5 minutes to under 45 seconds."
    ],
    keyFeatures: [
      {
        title: "Smart Location & Amenities Filter",
        description: "Allows buyers to filter properties by school district rating, walkability score, transit proximity, and custom price ranges."
      },
      {
        title: "Interactive Virtual Tour & Floor Plans",
        description: "Immersive image galleries combined with dimensional 2D/3D floor plan viewers for remote home evaluation."
      },
      {
        title: "Direct Agent Booking System",
        description: "Integrated real-time calendar picker for scheduling physical or live video walkthroughs with listing agents."
      },
      {
        title: "Neighborhood Insights & Mortgage Calculator",
        description: "Live mortgage estimation tool based on current interest rates, down payments, and property tax metrics."
      }
    ],
    colorPalette: [
      { name: "Slate Navy", hex: "#0F172A" },
      { name: "Primary Blue", hex: "#2563EB" },
      { name: "Emerald Mint", hex: "#10B981" },
      { name: "Soft Neutral", hex: "#F8FAFC" },
      { name: "Border Slate", hex: "#E2E8F0" }
    ],
    figmaEmbedUrl: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/F2AvhN7yYxGO5ntgoboXBu/realestate-project?node-id=0-1",
    interactivePreviewType: "figma"
  },
  {
    id: "ecommerce-project",
    title: "Luxura E-Commerce Shopping Experience",
    subtitle: "High-Converting Mobile & Web Shopping Application",
    category: "E-Commerce UI/UX",
    tag: "Featured Project",
    image: "/images/ecommerce_preview.png",
    figmaUrl: "https://www.figma.com/design/WTaCjOJT4mZZ1fhk7V71u4/Ecommerce-project?node-id=1-15080&t=T5GXz5aKnYeTRjy8-1",
    role: "UI/UX & Product Designer",
    timeline: "4 Weeks (Wireframing, UI Design System, Prototype)",
    tools: ["Figma", "Adobe Illustrator", "Prototyping", "UI Design System"],
    summary: "A sleek, conversion-focused e-commerce application featuring intuitive product discovery, visual filter systems, instant checkout flow, wishlist management, and detailed product showcase layouts.",
    problemStatement: "E-commerce shoppers frequently abandon carts due to cluttered product pages, hidden shipping costs, and multi-step checkout processes that create friction.",
    solution: "Crafted a minimalist, typography-driven shopping experience with persistent mini-cart drawer, transparent pricing breakdowns, one-click checkout, and rich visual product carousels.",
    researchHighlights: [
      "Analyzed competitor e-commerce platforms to benchmark cart completion rates.",
      "Discovered that sticky 'Add to Bag' buttons increase conversion velocity by 24%.",
      "Designed mobile-first interaction patterns optimized for thumb-zone navigation.",
      "Developed a consistent typography and color system supporting light and dark modes."
    ],
    keyFeatures: [
      {
        title: "Visual Product Grid & Quick View",
        description: "Dynamic product cards with quick variant selection (sizes, colors) without forcing full page reload."
      },
      {
        title: "Slide-Out Mini Cart & One-Click Checkout",
        description: "Frictionless shopping bag drawer with free shipping progress bar and instant express payment integrations."
      },
      {
        title: "Customer Reviews & Social Proof",
        description: "Rich media customer review section with verified buyer badges and photo ratings."
      },
      {
        title: "Personalized Wishlist & Saved Items",
        description: "Allows shoppers to curate collections and receive price drop alerts on saved products."
      }
    ],
    colorPalette: [
      { name: "Obsidian Black", hex: "#0F1115" },
      { name: "Accent Indigo", hex: "#6366F1" },
      { name: "Warm Gold", hex: "#F59E0B" },
      { name: "Off White", hex: "#FAFAFA" },
      { name: "Subtle Gray", hex: "#E5E7EB" }
    ],
    figmaEmbedUrl: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/WTaCjOJT4mZZ1fhk7V71u4/Ecommerce-project?node-id=1-15080",
    interactivePreviewType: "figma"
  },
  {
    id: "evento-app",
    title: "Evento | Event Management App",
    subtitle: "Seamless Mobile Experience for Event Organizers & Attendees",
    category: "Mobile App UI/UX",
    tag: "Featured Project",
    image: "/images/evento_preview.png",
    figmaUrl: "https://www.figma.com/design/YAfvUt0AAXPNGMIDy9doaj/Event-App?node-id=74-50&t=ISPgv8vgZxmSF0Og-1",
    role: "Lead Mobile UX/UI Designer",
    timeline: "3 Weeks (User Flow, Wireframing & App Prototype)",
    tools: ["Figma", "Balsamiq", "User Flow", "Mobile Prototyping"],
    summary: "Designed and developed a user-friendly mobile event management app enabling organizers to create and manage events effortlessly while allowing attendees to explore, register, and check in via dynamic QR codes.",
    problemStatement: "Event discovery mobile apps often lack clear categorization, ticket status updates, and interactive venue navigation, creating confusion for attendees at physical events.",
    solution: "Built a vibrant, card-based mobile application with personalized event recommendations, in-app digital ticket wallet with offline QR access, and real-time event updates.",
    researchHighlights: [
      "Surveyed 25 event attendees and 5 event organizers to map event lifecycle touchpoints.",
      "Identified that digital ticket accessibility at venue entrances is the #1 pain point.",
      "Created high-fidelity mobile prototypes tested with real users for tap accuracy.",
      "Optimized navigation hierarchy into 4 main tabs: Discover, My Tickets, Saved, Profile."
    ],
    keyFeatures: [
      {
        title: "Dynamic Event Discovery Feed",
        description: "Category filters (Concerts, Tech Conferences, Workshops) with geolocation-based event suggestions."
      },
      {
        title: "In-App Digital Ticket Wallet",
        description: "Instant QR code tickets stored locally on device for lightning-fast event check-in."
      },
      {
        title: "Organizer Event Dashboard",
        description: "Real-time ticket sales tracking, attendee list management, and push notification announcements."
      },
      {
        title: "Interactive Venue Maps & Schedule",
        description: "Detailed session timetables and venue layout maps with speaker bios and bookmarking."
      }
    ],
    colorPalette: [
      { name: "Deep Violet", hex: "#4F46E5" },
      { name: "Vibrant Coral", hex: "#F43F5E" },
      { name: "Electric Cyan", hex: "#06B6D4" },
      { name: "Charcoal Dark", hex: "#18181B" },
      { name: "Pure Light", hex: "#FFFFFF" }
    ],
    figmaEmbedUrl: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/YAfvUt0AAXPNGMIDy9doaj/Event-App?node-id=74-50",
    interactivePreviewType: "figma"
  },
  {
    id: "crm-project",
    title: "Apex CRM Enterprise Dashboard",
    subtitle: "Data-Driven Sales Funnel & Customer Relations Hub",
    category: "Enterprise UI/UX & Dashboard",
    tag: "Featured Project",
    image: "/images/crm_preview.png",
    figmaUrl: "https://www.figma.com/design/A4iihlEtbhdKV6xaq7GtDx/CRM?node-id=0-1&t=NJ3VnhCh8fQCZJXJ-1",
    role: "UI/UX & Product Designer",
    timeline: "4 Weeks (System Architecture, Dashboard Components)",
    tools: ["Figma", "Miro", "Competitor Analysis", "Design System"],
    summary: "Comprehensive Customer Relationship Management (CRM) platform designed for tracking sales leads, monitoring revenue pipelines, automation workflows, and analyzing customer interaction histories.",
    problemStatement: "Enterprise CRM tools are notoriously cluttered, difficult to navigate, and require steep learning curves, resulting in reduced data input compliance by sales reps.",
    solution: "Engineered an intuitive, modular dashboard system with visual Kanban deal boards, real-time KPI metrics, automated task queues, and clean dark/light themes.",
    researchHighlights: [
      "Evaluated top enterprise CRM tools to eliminate redundant menu layers and hidden actions.",
      "Designed a flexible widget grid system allowing users to customize their primary dashboard view.",
      "Structured a unified design system with reusable UI components for cards, charts, and tables.",
      "Streamlined lead creation flow down to a quick modal popup accessible from any screen."
    ],
    keyFeatures: [
      {
        title: "Visual Kanban Sales Pipeline",
        description: "Drag-and-drop deal tracking cards with stage probabilities, expected revenue, and activity reminders."
      },
      {
        title: "Real-Time Revenue Analytics",
        description: "Interactive line charts, bar graphs, and conversion rate indicators for sales performance overview."
      },
      {
        title: "Customer Interaction History",
        description: "Timeline view of customer emails, calls, notes, and deal history in a single view."
      },
      {
        title: "Task Automation & Notifications",
        description: "Automated follow-up reminders, team assignment tags, and deadline alerts."
      }
    ],
    colorPalette: [
      { name: "Dark Surface", hex: "#0B0F19" },
      { name: "Card Dark", hex: "#111827" },
      { name: "Brand Accent", hex: "#3B82F6" },
      { name: "Success Green", hex: "#10B981" },
      { name: "Text Gray", hex: "#9CA3AF" }
    ],
    figmaEmbedUrl: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/A4iihlEtbhdKV6xaq7GtDx/CRM?node-id=0-1",
    interactivePreviewType: "figma"
  },
  {
    id: "dating-app",
    title: "Connect D’Amour Matchmaking App",
    subtitle: "Vibrant Social Discovery & Matchmaking Application",
    category: "Mobile App UI/UX",
    tag: "Featured Project",
    image: "/images/dating_app_preview.png",
    figmaUrl: "https://www.figma.com/design/0lHCdvPdNfU5E4lWYIay2W/Dating-project?node-id=1-2&t=pRiUPashsMVfHdB3-1",
    role: "Mobile UI/UX Designer",
    timeline: "3 Weeks (Concept Design, Interaction Animations)",
    tools: ["Figma", "Adobe XD", "Micro-Animations", "Prototyping"],
    summary: "Modern matchmaking and social discovery application designed with fluid card swiping interactions, personality icebreaker prompts, real-time audio/text chat, and customizable profile cards.",
    problemStatement: "Many dating platforms suffer from superficial swiping fatigue and repetitive profile layouts, making it hard for users to spark genuine conversations.",
    solution: "Created an engaging mobile interface focused on shared interests, interactive prompt cards, voice intros, and instant icebreaker starters.",
    researchHighlights: [
      "Conducted user research on mobile dating interaction behavior and micro-interactions.",
      "Designed card swiping feedback with responsive gesture animations and color shifts.",
      "Crafted vibrant gradient UI elements to evoke warmth, playfulness, and trust.",
      "Implemented privacy controls and profile verification badges to build trust."
    ],
    keyFeatures: [
      {
        title: "Fluid Card Swipe Deck",
        description: "Smooth gesture-driven profile cards with prompt answers, interest badges, and photo carousels."
      },
      {
        title: "Icebreaker & Conversation Starters",
        description: "Interactive question prompts that allow matched users to skip small talk and connect."
      },
      {
        title: "Rich Chat & Voice Messaging",
        description: "Real-time messaging with sticker reactions, photo sharing, and audio message previews."
      },
      {
        title: "Profile Customizer & Verification",
        description: "Custom bio badges, music preferences integration, and verified profile checkmark system."
      }
    ],
    colorPalette: [
      { name: "Sunset Pink", hex: "#EC4899" },
      { name: "Warm Orange", hex: "#F97316" },
      { name: "Soft Purple", hex: "#8B5CF6" },
      { name: "Background White", hex: "#FFFFFF" },
      { name: "Dark Text", hex: "#1F2937" }
    ],
    figmaEmbedUrl: "https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/0lHCdvPdNfU5E4lWYIay2W/Dating-project?node-id=1-2",
    interactivePreviewType: "figma"
  },
  {
    id: "breezesky-resort",
    title: "BreezeSky | Resort & Stay Website",
    subtitle: "Modern Luxury Resort & Weekend Getaway Booking Platform",
    category: "Resort & Web Design",
    tag: "Resume Project",
    image: "/images/project_coral_spiral.png",
    figmaUrl: "#",
    role: "UI/UX Designer",
    timeline: "2 Weeks",
    tools: ["Figma", "Adobe Photoshop", "Web Design"],
    summary: "Designed a modern, user-friendly resort website for weekend planners to explore stays, view amenities, inspect villa layouts, and book packages instantly.",
    problemStatement: "Resort websites often hide essential villa details, amenities, and room availability behind cumbersome multi-page forms.",
    solution: "Crafted a tranquil, visual-heavy resort web interface with instant dates picker, villa virtual preview, and transparent package pricing.",
    researchHighlights: [
      "Targeted weekend travelers seeking hassle-free resort stay bookings.",
      "Emphasized imagery-led UI cards showing pools, dining, and wellness amenities."
    ],
    keyFeatures: [
      {
        title: "Instant Room Availability Calendar",
        description: "Quick date selection and package customizer with real-time rate calculations."
      },
      {
        title: "Villa & Amenity Showcase",
        description: "High-resolution photo carousels highlighting luxury features and dining options."
      }
    ],
    colorPalette: [
      { name: "Ocean Teal", hex: "#0D9488" },
      { name: "Sandy Gold", hex: "#D97706" },
      { name: "Warm Neutral", hex: "#FFFBEB" }
    ],
    figmaEmbedUrl: "",
    interactivePreviewType: "simulator"
  },
  {
    id: "mindspace-comic-dashboard",
    title: "MindSpace | Online Comic Dashboard",
    subtitle: "Digital Comic & Manga Web Reading Experience",
    category: "Web Dashboard UI/UX",
    tag: "Resume Project",
    image: "/images/project_shopease.png",
    figmaUrl: "#",
    role: "UI/UX Designer",
    timeline: "2 Weeks",
    tools: ["Figma", "Wireframing", "User Experience"],
    summary: "An intuitive web dashboard for browsing, bookmarking, and reading digital comics with a comfortable reader mode, dark theme option, and issue management.",
    problemStatement: "Online comic readers are often overloaded with ads, poor page navigation, and distracting UI elements that ruin reading focus.",
    solution: "Designed a distraction-free reader layout with custom background color modes, episode bookmarking, and infinite vertical scroll.",
    researchHighlights: [
      "Surveyed digital comic readers for optimal font sizes and reader controls.",
      "Optimized dark mode contrast to minimize eye strain during extended reading sessions."
    ],
    keyFeatures: [
      {
        title: "Distraction-Free Reader Mode",
        description: "Customizable reader controls with single-page and double-page vertical scroll modes."
      },
      {
        title: "Personalized Library & History",
        description: "Track reading progress across series and receive new chapter notifications."
      }
    ],
    colorPalette: [
      { name: "Slate Black", hex: "#0F172A" },
      { name: "Neon Violet", hex: "#A855F7" },
      { name: "Soft Gray", hex: "#E2E8F0" }
    ],
    figmaEmbedUrl: "",
    interactivePreviewType: "simulator"
  },
  {
    id: "react-blog-website",
    title: "Academic Student Blog & Peer Chat",
    subtitle: "Full-Stack Responsive Blog & Academic Discussion Platform",
    category: "Front-End Development",
    tag: "Technical Project",
    image: "/images/project_summer_vibes.png",
    figmaUrl: "#",
    role: "Front-End Developer",
    timeline: "3 Weeks",
    tools: ["React JS", "Node JS", "HTML & CSS", "JavaScript"],
    summary: "Developed a responsive web blog platform focused on student education, experience sharing, academic project publishing, and real-time private peer communication.",
    problemStatement: "Students lack dedicated academic discussion channels where they can write technical articles and interact in focused peer discussion threads.",
    solution: "Built a React-powered blog platform featuring rich article creation, tagging system, and integrated real-time chat module.",
    researchHighlights: [
      "Engineered responsive components using React hooks and modular CSS styles.",
      "Integrated Node.js backend logic for user registration and chat messaging."
    ],
    keyFeatures: [
      {
        title: "Article Publishing Engine",
        description: "Rich text editor with code snippet support, categories, and student author profiles."
      },
      {
        title: "Private Academic Chat",
        description: "Real-time messaging feature for direct student collaboration on academic projects."
      }
    ],
    colorPalette: [
      { name: "Tech Blue", hex: "#3B82F6" },
      { name: "Emerald Green", hex: "#10B981" },
      { name: "Dark Slate", hex: "#1E293B" }
    ],
    figmaEmbedUrl: "",
    interactivePreviewType: "simulator"
  }
];
