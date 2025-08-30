import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Ensure inputs are cleaned
    const cleanEmail = email.trim().replace(/^eq\./, "");
    const cleanPassword = password.trim().replace(/^eq\./, "");

    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", cleanEmail)
      .eq("password", cleanPassword)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    return NextResponse.json({ success: true, user: data });
  } catch (err) {
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });
  }
}
