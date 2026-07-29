import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { profileData } from "@/data/profileData";

export async function GET() {
  try {
    const { data, error } = await supabase.from("profile").select("*").single();

    if (error) {
      // If table doesn't exist (code 42P01) or is empty
      const isTableMissing = error.code === "42P01" || error.message?.includes("does not exist");
      return NextResponse.json({
        success: true,
        data: profileData,
        tableExists: !isTableMissing,
        warning: isTableMissing
          ? "Table 'profile' does not exist in Supabase yet. Run SQL DDL from Admin."
          : error.message,
      });
    }

    if (!data) {
      return NextResponse.json({ success: true, data: profileData, tableExists: true });
    }

    const mergedData = {
      ...profileData,
      ...data,
      socials: { ...profileData.socials, ...(data.socials || {}) },
      services: data.services || profileData.services,
      education: data.education || profileData.education,
      skills: data.skills || profileData.skills,
      technicalSkills: data.technical_skills || data.technicalSkills || profileData.technicalSkills,
      tools: data.tools || profileData.tools,
      stats: data.stats || profileData.stats,
    };

    return NextResponse.json({ success: true, data: mergedData, tableExists: true });
  } catch {
    return NextResponse.json({ success: true, data: profileData, tableExists: false });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const dbPayload = {
      id: 1,
      name: body.name || profileData.name,
      title: body.title || profileData.title,
      short_role: body.shortRole || profileData.shortRole,
      avatar: body.avatar || profileData.avatar,
      location: body.location || profileData.location,
      email: body.email || profileData.email,
      phone: body.phone || profileData.phone,
      bio: body.bio || profileData.bio,
      hero_title: body.heroTitle || profileData.heroTitle,
      hero_subtitle: body.heroSubtitle || profileData.heroSubtitle,
      hero_tagline: body.heroTagline || profileData.heroTagline,
      education: body.education || profileData.education,
      skills: body.skills || profileData.skills,
      technical_skills: body.technicalSkills || profileData.technicalSkills,
      tools: body.tools || profileData.tools,
      socials: body.socials || profileData.socials,
      stats: body.stats || profileData.stats,
      services: body.services || profileData.services,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("profile")
      .upsert(dbPayload)
      .select();

    if (error) {
      const isTableMissing = error.code === "42P01" || error.message?.includes("does not exist");
      return NextResponse.json(
        {
          success: false,
          error: isTableMissing
            ? "Table 'profile' does not exist in Supabase. Please click 'Auto-Create & Sync Database' or run SQL DDL."
            : error.message,
          tableExists: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data[0], tableExists: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
