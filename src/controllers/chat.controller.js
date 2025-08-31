import { runLLM } from '../services/llm.service.js';
import { listProducts, createCart, updateCart } from '../services/backend.service.js';
import { formatProducts, formatCart } from '../utils/formatters.js';

var cartId = 0;

export async function postChat(req, res) {
  const message = String(req.body?.message ?? '').trim();
  if (!message) return res.json({ reply: 'Decime qué querés ver o comprar.' });

  try {
    const decision = await runLLM(message);

    if (decision.kind === 'text' || !decision.name) {
      return res.json({ reply: decision.text || 'Puedo listar productos o manejar carritos.' });
    }

    if (decision.name === 'list_products') {
      const rawQ = typeof decision.args?.q === 'string' ? decision.args.q : '';
      const products = await listProducts(rawQ);
      return res.json({ reply: formatProducts(products) });
    }

    if (decision.name === 'create_cart' && cartId === 0) {
      const items = Array.isArray(decision.args?.items) ? decision.args.items : [];
      const resp = await createCart(items);
      cartId = resp.cart.id;
      return res.json({ reply: formatCart(resp) });
    } else {
      decision.name = 'update_cart';
    }

    if (decision.name === 'update_cart') {
      const items = Array.isArray(decision.args?.items) ? decision.args.items : [];
      if (!cartId || items.length === 0) {
        return res.json({ reply: 'Necesito el ID del carrito y al menos un item para actualizar.' });
      }
      const resp = await updateCart(cartId, items);

      return res.json({ reply: formatCart(resp) });
    }

    return res.json({ reply: 'Por ahora solo puedo listar productos o manejar carritos.' });
  } catch (error) {
    console.error('[POST /chat]', error);
    if (error?.status === 429) {
      return res.json({ reply: 'Sin cuota de IA por hoy.' });
    }
    return res.status(502).json({ reply: 'No pude procesar tu pedido ahora.' });
  }
}