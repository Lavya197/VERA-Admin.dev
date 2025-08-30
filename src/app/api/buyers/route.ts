// src/app/api/buyers/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("buyers")
      .select("id, full_name, email, wallet_pubkey, status, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("GET /api/buyers error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/buyers exception:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { full_name, email, password, wallet_pubkey } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "email and password are required" }, { status: 400 });
    }

    const insertObj = {
      full_name: full_name ?? null,
      email,
      password,
      wallet_pubkey: wallet_pubkey ?? null,
    };

    const { data, error } = await supabase.from("buyers").insert([insertObj]).select().single();

    if (error) {
      console.error("POST /api/buyers error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("POST /api/buyers exception:", err);
    return NextResponse.json({ error: "Failed to create buyer" }, { status: 500 });
  }
}
