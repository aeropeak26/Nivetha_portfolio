import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { blogsData } from "@/data/blogsData";

export async function GET() {
  try {
    const { data, error } = await supabase.from("blogs").select("*");
    if (error || !data || data.length === 0) {
      return NextResponse.json({ success: true, data: blogsData });
    }
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: true, data: blogsData });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase.from("blogs").upsert(body).select();
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, data: data[0] });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
