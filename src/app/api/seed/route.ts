import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { projectsData } from "@/data/projectsData";
import { profileData } from "@/data/profileData";

export async function POST() {
  try {
    // 1. Seed Profile
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
      education: profileData.education,
      skills: profileData.skills,
      technical_skills: profileData.technicalSkills,
      tools: profileData.tools,
      socials: profileData.socials,
      stats: profileData.stats,
      updated_at: new Date().toISOString(),
    });

    // 2. Seed Projects
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
      message: "Database successfully seeded with website profile & projects!",
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
-- SQL Schema Definition for Supabase Database
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
  education JSONB,
  skills JSONB,
  technical_skills JSONB,
  tools JSONB,
  socials JSONB,
  stats JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT,
  tag TEXT,
  image TEXT, -- Holds Base64 string or URL
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
  `.trim();
}
