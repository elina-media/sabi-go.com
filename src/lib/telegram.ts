type TelegramLead = {
  tour: string;
  seats: number;
  totalPrice: string;
  fullName: string;
  whatsapp: string;
  email: string;
};

export async function sendLeadToTelegram(lead: TelegramLead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram env vars are not configured");
  }

  const lines = ["New lead from sabigo.travel", `Tour: ${lead.tour}`];

  if (lead.totalPrice) {
    lines.push(`Seats: ${lead.seats}`, `Total: ${lead.totalPrice}`);
  }

  lines.push(
    `Name: ${lead.fullName}`,
    `WhatsApp: ${lead.whatsapp}`,
    `Email: ${lead.email}`,
  );

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: lines.join("\n") }),
    },
  );

  if (!response.ok) {
    throw new Error(`Telegram API responded with ${response.status}`);
  }
}
