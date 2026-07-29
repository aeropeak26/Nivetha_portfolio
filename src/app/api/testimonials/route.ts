import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { testimonialsData } from "@/data/testimonialsData";

export async function GET() {
  try {
    const { data, error } = await supabase.from("testimonials").select("*");
    if (error || !data || data.length === 0) {
      return NextResponse.json({ success: true, data: testimonialsData });
    }
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: true, data: testimonialsData });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase.from("testimonials").upsert(body).select();
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, data: data[0] });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
