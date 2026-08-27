import { NextRequest, NextResponse } from "next/server";
import { sendLeadToTelegram } from "@/lib/telegram";
import { appendLeadToSheet } from "@/lib/leadSheet";

type LeadRequestBody = {
  tour: string;
  fullName: string;
  whatsapp: string;
  email: string;
  company: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: NextRequest) {
  let body: Partial<LeadRequestBody>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const { tour, fullName, whatsapp, email, company } = body;

  if (
    !isNonEmptyString(tour) ||
    !isNonEmptyString(fullName) ||
    !isNonEmptyString(whatsapp) ||
    !isNonEmptyString(email) ||
    !email.includes("@")
  ) {
    return NextResponse.json(
      { ok: false, error: "Missing or invalid fields" },
      { status: 400 },
    );
  }

  if (typeof company === "string" && company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const lead = { tour, fullName, whatsapp, email };

  const results = await Promise.allSettled([
    sendLeadToTelegram(lead),
    appendLeadToSheet(lead),
  ]);

  const failure = results.find(
    (result): result is PromiseRejectedResult => result.status === "rejected",
  );

  if (failure) {
    console.error("Lead delivery failed:", failure.reason);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
