"use client";
import { CalEmbed } from "@/components/CalEmbed";

/** Closing-section booking block (dark background). Cal.com handles the scheduling and confirmation emails. */
export function QuickBook() {
  return <CalEmbed theme="dark" className="rounded-3xl border border-paper/20 p-4 text-paper" />;
}
