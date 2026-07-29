import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expectedPassword = process.env.ADMIN_PASSWORD || "Nivetha@26";

    if (password === expectedPassword) {
      return NextResponse.json({
        success: true,
        message: "Admin authenticated successfully",
        token: "admin-session-active",
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid admin password" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request payload" },
      { status: 400 }
    );
  }
}
