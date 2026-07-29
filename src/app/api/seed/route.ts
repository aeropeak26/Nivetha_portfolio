import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { projectsData } from "@/data/projectsData";
import { profileData } from "@/data/profileData";

export async function POST() {
  try {
    // 1. Seed Profile Table
    const { error: profileError } = await supabase.from("profile").upsert({
      id: 1,
      name: profileData.name,
      title: profileData.title,
      short_role: profileData.shortRole,
      avatar: profileData.avatar,
      location: profileData.location,
      email: profileData.email,
      phone: profileData.phone,
      bio: profileData.bio,
      hero_title: profileData.heroTitle,
      hero_subtitle: profileData.heroSubtitle,
      hero_tagline: profileData.heroTagline,
      education: profileData.education,
      skills: profileData.skills,
      technical_skills: profileData.technicalSkills,
      tools: profileData.tools,
      socials: profileData.socials,
      stats: profileData.stats,
      services: profileData.services,
      updated_at: new Date().toISOString(),
    });

    // 2. Seed Projects Table
    const projectsPayload = projectsData.map((project) => ({
      id: project.id,
      title: project.title,
      subtitle: project.subtitle,
      category: project.category,
      tag: project.tag,
      image: project.image,
      figma_url: project.figmaUrl,
      live_preview_url: project.livePreviewUrl || "",
      role: project.role,
      timeline: project.timeline,
      tools: project.tools,
      summary: project.summary,
      problem_statement: project.problemStatement,
      solution: project.solution,
      research_highlights: project.researchHighlights,
      key_features: project.keyFeatures,
      color_palette: project.colorPalette,
      figma_embed_url: project.figmaEmbedUrl,
      interactive_preview_type: project.interactivePreviewType,
      updated_at: new Date().toISOString(),
    }));

    const { error: projectsError } = await supabase
      .from("projects")
      .upsert(projectsPayload);

    const isMissingTable =
      profileError?.code === "42P01" ||
      projectsError?.code === "42P01" ||
      profileError?.message?.includes("does not exist") ||
      projectsError?.message?.includes("does not exist");

    if (isMissingTable) {
      return NextResponse.json({
        success: false,
        error: "Database tables ('projects' or 'profile') have not been created in Supabase yet.",
        tableMissing: true,
        sqlSchema: getSqlSchema(),
        instructions: "Copy the SQL script below, open Supabase SQL Editor (https://supabase.com/dashboard), paste & click Run!",
      });
    }

    if (profileError || projectsError) {
      return NextResponse.json({
        success: false,
        profileError: profileError?.message,
        projectsError: projectsError?.message,
        sqlSchema: getSqlSchema(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Database tables populated and synced with all website data successfully!",
      sqlSchema: getSqlSchema(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({
      success: false,
      error: message,
      sqlSchema: getSqlSchema(),
    });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    sqlSchema: getSqlSchema(),
  });
}

function getSqlSchema() {
  return `
-- ===================================================
-- NIVETHA VELUSAMY PORTFOLIO - SUPABASE TABLE DDL
-- Paste & Run in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/iowejpqoezjjfrecqiip/sql
-- ===================================================

-- 1. Create Profile Table
CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY DEFAULT 1,
  name TEXT NOT NULL,
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
  education JSONB,
  skills JSONB,
  technical_skills JSONB,
  tools JSONB,
  socials JSONB,
  stats JSONB,
  services JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT,
  tag TEXT,
  image TEXT, -- Holds Base64 Data URL or Image Link
  figma_url TEXT,
  live_preview_url TEXT,
  role TEXT,
  timeline TEXT,
  tools JSONB,
  summary TEXT,
  problem_statement TEXT,
  solution TEXT,
  research_highlights JSONB,
  key_features JSONB,
  color_palette JSONB,
  figma_embed_url TEXT,
  interactive_preview_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) & Allow Read/Write
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Allow public write profile" ON profile FOR ALL USING (true);

CREATE POLICY "Allow public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public write projects" ON projects FOR ALL USING (true);
  `.trim();
}
