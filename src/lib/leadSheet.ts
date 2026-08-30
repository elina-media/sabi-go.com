import { google } from "googleapis";

type SheetLead = {
  tour: string;
  seats: number;
  totalPrice: string;
  fullName: string;
  whatsapp: string;
  email: string;
};

export async function appendLeadToSheet(lead: SheetLead): Promise<void> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error("Google Sheets env vars are not configured");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Leads!A:G",
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          lead.tour,
          lead.seats,
          lead.totalPrice,
          lead.fullName,
          lead.whatsapp,
          lead.email,
        ],
      ],
    },
  });
}
