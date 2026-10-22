import { supabase } from "./supabase";

export interface Receipt {
  id: string;
  metric: string;
  value: string;
  source: string;
  measured_on: string;
  link: string | null;
}

/** Real rows from the Supabase `receipts` table. Empty (not fake) when none exist or Supabase is not configured. */
export async function getReceipts(): Promise<Receipt[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from("receipts").select("*").order("measured_on", { ascending: false }).limit(50);
  return error || !data ? [] : (data as Receipt[]);
}
