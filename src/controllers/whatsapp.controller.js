import { verifyWebhook, sendMessage } from "../services/whatsapp.service.js";

// Verificación inicial que pide Meta
export function verifyWebhookController(req, res) {
    const VERIFY_TOKEN = process.env.WPP_VERIFY_TOKEN;

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log("✅ Webhook verificado por Meta");
        return res.status(200).send(challenge); // 👈 devuelve el número plano
    } else {
        return res.sendStatus(403);
    }
}

// Mensajes entrantes
export async function incomingMessageController(req, res) {
    try {
        const msg = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
        if (msg) {
            const from = msg.from; // número del usuario
            console.log("📩 Mensaje recibido de:", from, msg.text?.body);

            // Responder siempre con lo mismo
            await sendMessage(from, "HOLA ESTOY ANDANDO!");
        }
        res.sendStatus(200); // siempre responder OK a Meta
    } catch (err) {
        console.error("❌ Error en webhook:", err);
        res.sendStatus(500);
    }
}