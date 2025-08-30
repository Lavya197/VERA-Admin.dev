import { createClient } from "@supabase/supabase-js";

const NEXT_PUBLIC_supabaseUrl = "https://pmztkxrqldmhdpgznmoz.supabase.co";
const NEXT_PUBLIC_supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtenRreHJxbGRtaGRwZ3pubW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1ODY0MTgsImV4cCI6MjA3MjE2MjQxOH0.OwxLfMmIDQvWxXwcxSqeiTFzcncXIT3LA9VnczaXEg8";

if (!NEXT_PUBLIC_supabaseUrl || !NEXT_PUBLIC_supabaseAnonKey) {
  throw new Error("Supabase URL and Key are required");
}

export const supabase = createClient(NEXT_PUBLIC_supabaseUrl, NEXT_PUBLIC_supabaseAnonKey);
