import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { projectsData } from "@/data/projectsData";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      const isTableMissing = error.code === "42P01" || error.message?.includes("does not exist");
      return NextResponse.json({
        success: true,
        data: projectsData,
        source: "local_fallback",
        tableExists: !isTableMissing,
        warning: isTableMissing
          ? "Table 'projects' does not exist in Supabase yet. Please run SQL DDL script."
          : error.message,
      });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({
        success: true,
        data: projectsData,
        source: "local_fallback",
        tableExists: true,
      });
    }

    // Format DB records to Project interface
    const formattedData = data.map((item) => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle || "",
      category: item.category || "UI/UX Design",
      tag: item.tag || "Featured Project",
      image: item.image || "/images/realestate_preview.png",
      figmaUrl: item.figma_url || item.figmaUrl || "#",
      livePreviewUrl: item.live_preview_url || item.livePreviewUrl || "",
      role: item.role || "UI/UX Designer",
      timeline: item.timeline || "3 Weeks",
      tools: Array.isArray(item.tools) ? item.tools : (typeof item.tools === 'string' ? JSON.parse(item.tools) : []),
      summary: item.summary || "",
      problemStatement: item.problem_statement || item.problemStatement || "",
      solution: item.solution || "",
      researchHighlights: Array.isArray(item.research_highlights) ? item.research_highlights : (typeof item.research_highlights === 'string' ? JSON.parse(item.research_highlights) : []),
      keyFeatures: Array.isArray(item.key_features) ? item.key_features : (typeof item.key_features === 'string' ? JSON.parse(item.key_features) : []),
      colorPalette: Array.isArray(item.color_palette) ? item.color_palette : (typeof item.color_palette === 'string' ? JSON.parse(item.color_palette) : []),
      figmaEmbedUrl: item.figma_embed_url || item.figmaEmbedUrl || "",
      interactivePreviewType: item.interactive_preview_type || item.interactivePreviewType || "figma",
      featuredOnHero: Boolean(item.featured_on_hero ?? item.featuredOnHero ?? false),
    }));

    return NextResponse.json({
      success: true,
      data: formattedData,
      source: "supabase",
      tableExists: true,
    });
  } catch {
    return NextResponse.json({
      success: true,
      data: projectsData,
      source: "local_fallback",
      tableExists: false,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const dbPayload = {
      id: body.id || `project-${Date.now()}`,
      title: body.title,
      subtitle: body.subtitle || "",
      category: body.category || "UI/UX Design",
      tag: body.tag || "Featured Project",
      image: body.image, // Holds Base64 string or URL
      figma_url: body.figmaUrl || "#",
      live_preview_url: body.livePreviewUrl || "",
      role: body.role || "UI/UX Designer",
      timeline: body.timeline || "3 Weeks",
      tools: body.tools || [],
      summary: body.summary || "",
      problem_statement: body.problemStatement || "",
      solution: body.solution || "",
      research_highlights: body.researchHighlights || [],
      key_features: body.keyFeatures || [],
      color_palette: body.colorPalette || [],
      figma_embed_url: body.figmaEmbedUrl || "",
      interactive_preview_type: body.interactivePreviewType || "figma",
      featured_on_hero: Boolean(body.featuredOnHero),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("projects")
      .upsert(dbPayload)
      .select();

    if (error) {
      const isTableMissing = error.code === "42P01" || error.message?.includes("does not exist");
      return NextResponse.json(
        {
          success: false,
          error: isTableMissing
            ? "Table 'projects' does not exist in Supabase. Please click 'Auto-Create & Sync Database' or run SQL DDL."
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
