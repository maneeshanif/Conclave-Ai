import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Null until Supabase env vars are set; callers fall back to seed data. */
export const supabase = url && key ? createClient(url, key) : null;
