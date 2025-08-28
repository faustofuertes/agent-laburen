import fetch from "node-fetch";

const VERIFY_TOKEN = process.env.WPP_VERIFY_TOKEN;
const PHONE_NUMBER_ID = process.env.WPP_PHONE_NUMBER_ID;
const TOKEN = process.env.WPP_ACCESS_TOKEN;

// Validar challenge de Meta
export function verifyWebhook(query) {
  const mode = query["hub.mode"];
  const token = query["hub.verify_token"];
  const challenge = query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verificado por Meta");
    return challenge;
  }
  return null;
}

// Enviar respuesta a WhatsApp
export async function sendMessage(to, message) {
  const url = `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "messaging_product": "whatsapp",
      "to": "54223153454259",
      "type": "text",
      "text": { "body": "HOLA ESTOY ANDANDO!" }
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("❌ Error enviando mensaje:", err);
  }
}