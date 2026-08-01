import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { projectsData } from "@/data/projectsData";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      const localProject = projectsData.find((p) => p.id === id);
      if (localProject) {
        return NextResponse.json({ success: true, data: localProject });
      }
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const formattedProject = {
      id: data.id,
      title: data.title,
      subtitle: data.subtitle || "",
      category: data.category || "UI/UX Design",
      tag: data.tag || "Featured Project",
      image: data.image || "/images/realestate_preview.png",
      figmaUrl: data.figma_url || data.figmaUrl || "#",
      livePreviewUrl: data.live_preview_url || data.livePreviewUrl || "",
      role: data.role || "UI/UX Designer",
      timeline: data.timeline || "3 Weeks",
      tools: Array.isArray(data.tools) ? data.tools : (typeof data.tools === 'string' ? JSON.parse(data.tools) : []),
      summary: data.summary || "",
      problemStatement: data.problem_statement || data.problemStatement || "",
      solution: data.solution || "",
      researchHighlights: Array.isArray(data.research_highlights) ? data.research_highlights : (typeof data.research_highlights === 'string' ? JSON.parse(data.research_highlights) : []),
      keyFeatures: Array.isArray(data.key_features) ? data.key_features : (typeof data.key_features === 'string' ? JSON.parse(data.key_features) : []),
      colorPalette: Array.isArray(data.color_palette) ? data.color_palette : (typeof data.color_palette === 'string' ? JSON.parse(data.color_palette) : []),
      figmaEmbedUrl: data.figma_embed_url || data.figmaEmbedUrl || "",
      interactivePreviewType: data.interactive_preview_type || data.interactivePreviewType || "figma",
      featuredOnHero: Boolean(data.featured_on_hero ?? data.featuredOnHero ?? false),
    };

    return NextResponse.json({ success: true, data: formattedProject });
  } catch {
    const localProject = projectsData.find((p) => p.id === id);
    if (localProject) {
      return NextResponse.json({ success: true, data: localProject });
    }
    return NextResponse.json(
      { success: false, error: "Project not found" },
      { status: 404 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: `Project ${id} deleted` });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
