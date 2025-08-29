import fetch from "node-fetch";

const PHONE_NUMBER_ID = process.env.WPP_PHONE_NUMBER_ID;
const TOKEN = process.env.WPP_ACCESS_TOKEN;

export async function sendMessage(to, body) {
  const url = `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: 54223153454259,
      type: "text",
      text: { body }
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("❌ Error enviando mensaje:", err);
  }
}
