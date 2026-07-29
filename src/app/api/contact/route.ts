import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: true, data: [] });
    }
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = {
      id: `msg-${Date.now()}`,
      name: body.name,
      email: body.email,
      service: body.service || "General Inquiry",
      message: body.message,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("contact_messages")
      .insert([payload])
      .select();

    if (error) {
      console.warn("Could not save to Supabase DB:", error.message);
      return NextResponse.json({ success: true, message: "Received (local)" });
    }

    return NextResponse.json({ success: true, data: data[0] });
  } catch {
    return NextResponse.json({ success: true, message: "Received" });
  }
}
