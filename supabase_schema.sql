-- ========================================================
-- NIVETHA PORTFOLIO - SUPABASE DATABASE MIGRATION SCRIPT
-- Copy and paste this script into your Supabase SQL Editor
-- (Supabase Dashboard -> SQL Editor -> New Query -> Run)
-- ========================================================

-- 1. Ensure 'featured_on_hero' column exists in 'projects' table
ALTER TABLE IF EXISTS projects ADD COLUMN IF NOT EXISTS featured_on_hero BOOLEAN DEFAULT FALSE;

-- 2. Create 'projects' table if it does not exist yet
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

-- 3. Create 'faqs' table if it does not exist yet
CREATE TABLE IF NOT EXISTS faqs (
  id BIGINT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create 'profile' table if it does not exist yet
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

-- 5. Create 'services' table if it does not exist yet
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  items JSONB DEFAULT '[]'::jsonb,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create 'testimonials' table if it does not exist yet
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  quote TEXT,
  avatar TEXT,
  rating INT DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create 'blogs' table if it does not exist yet
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

-- 8. Create 'messages' (contact form inquiries) table if it does not exist yet
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
