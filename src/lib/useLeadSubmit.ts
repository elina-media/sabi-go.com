"use client";

import { useState } from "react";

export type LeadStatus = "idle" | "submitting" | "success" | "error";

export type LeadPayload = {
  tour: string;
  seats: number;
  totalPrice: string;
  fullName: string;
  whatsapp: string;
  email: string;
  company: string;
};

export function useLeadSubmit() {
  const [status, setStatus] = useState<LeadStatus>("idle");

  async function submit(payload: LeadPayload) {
    setStatus("submitting");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { ok: boolean };

      if (!response.ok || !data.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
  }

  return { status, submit, reset };
}
