import { BACKEND_URL } from '../config.js';

export async function listProducts(q) {
  const url = new URL('/products', BACKEND_URL);
  if (q && q.trim())
    url.searchParams.set('q', q.trim());

  const r = await fetch(url);

  if (!r.ok)
    throw new Error(`GET ${url} -> ${r.status}`);

  const data = await r.json();

  if (!Array.isArray(data))
    throw new Error('Response /products not array');

  return data;
}

export async function createCart(items) {
  const res = await fetch(new URL('/carts', BACKEND_URL), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items })
  });

  if (!res.ok)
    throw new Error(`POST /carts -> ${res.status}`);

  return res.json();
}

export async function updateCart(cartId, items) {
  const res = await fetch(`${BACKEND_URL}/carts/${cartId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items })
  });

  if (!res.ok) {
    let error;
    try { error = await res.json(); } catch { error = {}; }
    throw new Error(`PATCH /carts/${cartId} → ${res.status}: ${error.error || "Unknown error"}`);
  }

  return await res.json();
}