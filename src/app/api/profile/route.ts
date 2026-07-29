import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { profileData } from "@/data/profileData";

export async function GET() {
  try {
    const { data, error } = await supabase.from("profile").select("*").single();

    if (error || !data) {
      return NextResponse.json({ success: true, data: profileData });
    }

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: true, data: profileData });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, error } = await supabase
      .from("profile")
      .upsert({ id: 1, ...body, updated_at: new Date().toISOString() })
      .select();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: data[0] });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
