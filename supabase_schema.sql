-- ========================================================
-- NIVETHA PORTFOLIO - COMPLETE SUPABASE DDL & SEED DATA SCRIPT
-- Copy and paste this ENTIRE script into your Supabase SQL Editor:
-- (Supabase Dashboard -> SQL Editor -> New Query -> Run)
-- ========================================================

-- --------------------------------------------------------
-- 1. PROJECTS TABLE & SCHEMA UPDATE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT,
  tag TEXT,
  image TEXT,
  figma_url TEXT,
  live_preview_url TEXT,
  role TEXT,
  timeline TEXT,
  tools JSONB DEFAULT '[]'::jsonb,
  summary TEXT,
  problem_statement TEXT,
  solution TEXT,
  research_highlights JSONB DEFAULT '[]'::jsonb,
  key_features JSONB DEFAULT '[]'::jsonb,
  color_palette JSONB DEFAULT '[]'::jsonb,
  figma_embed_url TEXT,
  interactive_preview_type TEXT DEFAULT 'figma',
  featured_on_hero BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure column exists if table was created previously
ALTER TABLE projects ADD COLUMN IF NOT EXISTS featured_on_hero BOOLEAN DEFAULT FALSE;

-- --------------------------------------------------------
-- 2. FAQS TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS faqs (
  id BIGINT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- --------------------------------------------------------
-- 3. PROFILE TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY DEFAULT 1,
  name TEXT,
  title TEXT,
  short_role TEXT,
  avatar TEXT,
  location TEXT,
  email TEXT,
  phone TEXT,
  bio TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_tagline TEXT,
  education JSONB DEFAULT '[]'::jsonb,
  skills JSONB DEFAULT '[]'::jsonb,
  technical_skills JSONB DEFAULT '[]'::jsonb,
  tools JSONB DEFAULT '[]'::jsonb,
  socials JSONB DEFAULT '{}'::jsonb,
  stats JSONB DEFAULT '[]'::jsonb,
  services JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- --------------------------------------------------------
-- 4. SERVICES TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  items JSONB DEFAULT '[]'::jsonb,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- --------------------------------------------------------
-- 5. TESTIMONIALS TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  quote TEXT,
  avatar TEXT,
  rating INT DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- --------------------------------------------------------
-- 6. BLOGS TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  date TEXT,
  description TEXT,
  image TEXT,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- --------------------------------------------------------
-- 7. MESSAGES TABLE
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


-- ========================================================
-- SEED DATA INSERTIONS
-- ========================================================

-- Insert Projects (with featured_on_hero)
INSERT INTO projects (
  id, title, subtitle, category, tag, image, figma_url, live_preview_url,
  role, timeline, tools, summary, problem_statement, solution,
  research_highlights, key_features, color_palette, figma_embed_url,
  interactive_preview_type, featured_on_hero
) VALUES
(
  'realestate-project',
  'RealEstate Modern Property Portal',
  'End-to-End Real Estate Discovery & Virtual Tour Platform',
  'UI/UX & Web Design',
  'Featured Project',
  '/images/realestate_preview.png',
  'https://www.figma.com/design/F2AvhN7yYxGO5ntgoboXBu/realestate-project?node-id=0-1&t=T5GXz5aKnYeTRjy8-1',
  '',
  'Lead UI/UX Designer',
  '3 Weeks (User Research to High-Fidelity UI)',
  '["Figma", "Adobe Photoshop", "UX Research", "Wireframing"]'::jsonb,
  'A modern real estate portal engineered to revolutionize property browsing, offering intuitive neighborhood filters, high-resolution photo galleries, interactive floor plans, and instant agent scheduling.',
  'Traditional real estate websites overwhelm buyers with complex filters, cluttered property cards, and opaque scheduling procedures, leading to high drop-off rates during initial property research.',
  'Designed a clean, content-first property search platform featuring visual filter chips, instant map view toggles, transparent pricing cards, and a seamless 2-step tour booking modal.',
  '["Conducted 12 user interviews with home buyers and renters to identify key decision factors.", "Identified that 78% of users prioritize verified neighborhood insights and floor plan accuracy.", "Created 3 distinct buyer personas (First-time Homeowner, Investor, Luxury Buyer).", "Mapped out user journey flows to reduce property tour booking time from 5 minutes to under 45 seconds."]'::jsonb,
  '[{"title": "Smart Location & Amenities Filter", "description": "Allows buyers to filter properties by school district rating, walkability score, transit proximity, and custom price ranges."}, {"title": "Interactive Virtual Tour & Floor Plans", "description": "Immersive image galleries combined with dimensional 2D/3D floor plan viewers for remote home evaluation."}, {"title": "Direct Agent Booking System", "description": "Integrated real-time calendar picker for scheduling physical or live video walkthroughs with listing agents."}, {"title": "Neighborhood Insights & Mortgage Calculator", "description": "Live mortgage estimation tool based on current interest rates, down payments, and property tax metrics."}]'::jsonb,
  '[{"hex": "#0F172A", "name": "Slate Navy"}, {"hex": "#2563EB", "name": "Primary Blue"}, {"hex": "#10B981", "name": "Emerald Mint"}, {"hex": "#F8FAFC", "name": "Soft Neutral"}, {"hex": "#E2E8F0", "name": "Border Slate"}]'::jsonb,
  'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/F2AvhN7yYxGO5ntgoboXBu/realestate-project?node-id=0-1',
  'figma',
  TRUE
),
(
  'ecommerce-project',
  'Luxura E-Commerce Shopping Experience',
  'High-Converting Mobile & Web Shopping Application',
  'E-Commerce UI/UX',
  'Featured Project',
  '/images/ecommerce_preview.png',
  'https://www.figma.com/design/WTaCjOJT4mZZ1fhk7V71u4/Ecommerce-project?node-id=1-15080&t=T5GXz5aKnYeTRjy8-1',
  '',
  'UI/UX & Product Designer',
  '4 Weeks (Wireframing, UI Design System, Prototype)',
  '["Figma", "Adobe Illustrator", "Prototyping", "UI Design System"]'::jsonb,
  'A sleek, conversion-focused e-commerce application featuring intuitive product discovery, visual filter systems, instant checkout flow, wishlist management, and detailed product showcase layouts.',
  'E-commerce shoppers frequently abandon carts due to cluttered product pages, hidden shipping costs, and multi-step checkout processes that create friction.',
  'Crafted a minimalist, typography-driven shopping experience with persistent mini-cart drawer, transparent pricing breakdowns, one-click checkout, and rich visual product carousels.',
  '["Analyzed competitor e-commerce platforms to benchmark cart completion rates.", "Discovered that sticky ''Add to Bag'' buttons increase conversion velocity by 24%.", "Designed mobile-first interaction patterns optimized for thumb-zone navigation.", "Developed a consistent typography and color system supporting light and dark modes."]'::jsonb,
  '[{"title": "Visual Product Grid & Quick View", "description": "Dynamic product cards with quick variant selection (sizes, colors) without forcing full page reload."}, {"title": "Slide-Out Mini Cart & One-Click Checkout", "description": "Frictionless shopping bag drawer with free shipping progress bar and instant express payment integrations."}, {"title": "Customer Reviews & Social Proof", "description": "Rich media customer review section with verified buyer badges and photo ratings."}, {"title": "Personalized Wishlist & Saved Items", "description": "Allows shoppers to curate collections and receive price drop alerts on saved products."}]'::jsonb,
  '[{"hex": "#0F1115", "name": "Obsidian Black"}, {"hex": "#6366F1", "name": "Accent Indigo"}, {"hex": "#F59E0B", "name": "Warm Gold"}, {"hex": "#FAFAFA", "name": "Off White"}, {"hex": "#E5E7EB", "name": "Subtle Gray"}]'::jsonb,
  'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/WTaCjOJT4mZZ1fhk7V71u4/Ecommerce-project?node-id=1-15080',
  'figma',
  FALSE
),
(
  'evento-app',
  'Evento | Event Management App',
  'Seamless Mobile Experience for Event Organizers & Attendees',
  'Mobile App UI/UX',
  'Featured Project',
  '/images/evento_preview.png',
  'https://www.figma.com/design/YAfvUt0AAXPNGMIDy9doaj/Event-App?node-id=74-50&t=ISPgv8vgZxmSF0Og-1',
  '',
  'Lead Mobile UX/UI Designer',
  '3 Weeks (User Flow, Wireframing & App Prototype)',
  '["Figma", "Balsamiq", "User Flow", "Mobile Prototyping"]'::jsonb,
  'Designed and developed a user-friendly mobile event management app enabling organizers to create and manage events effortlessly while allowing attendees to explore, register, and check in via dynamic QR codes.',
  'Event discovery mobile apps often lack clear categorization, ticket status updates, and interactive venue navigation, creating confusion for attendees at physical events.',
  'Built a vibrant, card-based mobile application with personalized event recommendations, in-app digital ticket wallet with offline QR access, and real-time event updates.',
  '["Surveyed 25 event attendees and 5 event organizers to map event lifecycle touchpoints.", "Identified that digital ticket accessibility at venue entrances is the #1 pain point.", "Created high-fidelity mobile prototypes tested with real users for tap accuracy.", "Optimized navigation hierarchy into 4 main tabs: Discover, My Tickets, Saved, Profile."]'::jsonb,
  '[{"title": "Dynamic Event Discovery Feed", "description": "Category filters (Concerts, Tech Conferences, Workshops) with geolocation-based event suggestions."}, {"title": "In-App Digital Ticket Wallet", "description": "Instant QR code tickets stored locally on device for lightning-fast event check-in."}, {"title": "Organizer Event Dashboard", "description": "Real-time ticket sales tracking, attendee list management, and push notification announcements."}, {"title": "Interactive Venue Maps & Schedule", "description": "Detailed session timetables and venue layout maps with speaker bios and bookmarking."}]'::jsonb,
  '[{"hex": "#4F46E5", "name": "Deep Violet"}, {"hex": "#F43F5E", "name": "Vibrant Coral"}, {"hex": "#06B6D4", "name": "Electric Cyan"}, {"hex": "#18181B", "name": "Charcoal Dark"}, {"hex": "#FFFFFF", "name": "Pure Light"}]'::jsonb,
  'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/YAfvUt0AAXPNGMIDy9doaj/Event-App?node-id=74-50',
  'figma',
  FALSE
)
ON CONFLICT (id) DO UPDATE SET
  featured_on_hero = EXCLUDED.featured_on_hero,
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  category = EXCLUDED.category,
  image = EXCLUDED.image,
  updated_at = NOW();

-- Insert FAQs
INSERT INTO faqs (id, question, answer) VALUES
(1, '1. WHAT SERVICES DO YOU OFFER?', 'I specialize in UI/UX Design, Web Application Development (Next.js & React), Brand Identity Design, Framer Motion Animations, and Design System Architecture.'),
(2, '2. HOW DOES THE DESIGN PROCESS WORK?', 'Our process begins with a discovery session to align on goals, followed by wireframing, interactive UI prototypes, iteration cycles based on your feedback, and final high-performance deployment.'),
(3, '3. HOW LONG DOES A PROJECT USUALLY TAKE?', 'Typical project timelines range from 2 to 4 weeks depending on scope, complexity, and feature requirements.'),
(4, '4. WHAT DO I NEED TO PROVIDE BEFORE STARTING A PROJECT?', 'You''ll just need your project goals, any existing brand assets or logos, and content outline. I will guide you through everything else!'),
(5, '5. DO YOU OFFER REVISIONS?', 'Yes, all design packages include dedicated revision rounds to ensure the final product perfectly aligns with your expectations.'),
(6, '6. HOW DO I GET STARTED?', 'Simply fill out the contact form below or email me directly at nivethav012@gmail.com to schedule an initial discovery chat!')
ON CONFLICT (id) DO UPDATE SET
  question = EXCLUDED.question,
  answer = EXCLUDED.answer;

-- Insert Profile
INSERT INTO profile (
  id, name, title, short_role, avatar, location, email, phone, bio,
  hero_title, hero_subtitle, hero_tagline
) VALUES (
  1,
  'Nivetha Velusamy',
  'UI/UX Designer & Visual Designer & Front-End Developer',
  'UI/UX & Front-End Developer',
  '/images/Profile.png',
  'Punjai Puliampatti, Coimbatore, India',
  'nivethav012@gmail.com',
  '+91 9677700740',
  'Professional B.Tech graduate and skilled UI/UX Designer with a strong foundation in design principles and user-centered solutions.',
  'UI / UX DESIGNER',
  'Crafting intuitive, user-centered digital solutions with clean visuals and front-end code.',
  'NIVETHA VELUSAMY — PORTFOLIO'
)
ON CONFLICT (id) DO UPDATE SET
  hero_title = EXCLUDED.hero_title,
  hero_subtitle = EXCLUDED.hero_subtitle,
  updated_at = NOW();
