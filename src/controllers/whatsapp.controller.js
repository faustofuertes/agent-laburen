import { sendMessage } from "../services/whatsapp.service.js";
import { runLLM } from "../services/llm.service.js"
import { listProducts } from "../services/backend.service.js"
import { createCart } from "../services/backend.service.js"
import { updateCart } from "../services/backend.service.js"
import { formatCart } from "../utils/formatters.js"
import { formatProducts } from "../utils/formatters.js"

var cartId = 0;

export async function incomingMessageController(req, res) {
    try {
        const msg = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
        if (!msg) return res.sendStatus(200);

        const from = msg.from;
        const text = msg.text?.body?.trim() || "";

        console.log("Message received:", from, text);

        if (!text) {
            await sendMessage(from, "Decime qué querés ver o comprar.");
            return res.sendStatus(200);
        }

        const decision = await runLLM(text);

        if (decision.kind === "text" || !decision.name) {
            await sendMessage(from, decision.text || "Puedo listar productos o manejar carritos.");
            return res.sendStatus(200);
        }

        if (decision.name === "list_products") {
            const rawQ = typeof decision.args?.q === "string" ? decision.args.q : "";
            const products = await listProducts(rawQ);
            await sendMessage(from, formatProducts(products));
            return res.sendStatus(200);
        }

        if (decision.name === "create_cart" && cartId === 0) {
            const items = Array.isArray(decision.args?.items) ? decision.args.items : [];
            const resp = await createCart(items);
            cartId = resp.cart.id;
            await sendMessage(from, formatCart(resp));
            return res.sendStatus(200);
        }

        if (decision.name === "update_cart") {
            const items = Array.isArray(decision.args?.items) ? decision.args.items : [];
            if (!cartId || items.length === 0) {
                await sendMessage(from, "Necesito el ID del carrito y al menos un item para actualizar.");
                return res.sendStatus(200);
            }
            const resp = await updateCart(cartId, items);
            await sendMessage(from, formatCart(resp));
            return res.sendStatus(200);
        }

        await sendMessage(from, "Por ahora solo puedo listar productos o manejar carritos.");
        res.sendStatus(200);

    } catch (error) {
        console.error('[POST /chat]', error);
        if (error?.status === 429) {
            return res.json({ reply: 'Sin cuota de IA por hoy.' });
        }
        return res.status(502).json({ reply: 'No pude procesar tu pedido ahora.' });
    }
}