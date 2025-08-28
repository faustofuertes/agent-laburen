export function formatProducts(products, limit = 15) {
  const total = products.length;

  if (!total) return 'No se encontraron productos.';

  // recorto
  const slice = products.slice(0, limit);

  // calculo anchos para alinear
  const idWidth = Math.max(...slice.map(p => String(p.id).length), 2);
  const nameWidth = Math.max(...slice.map(p => (p.name || '').length), 4);

  const header =
    pad('ID', idWidth) + ' | ' +
    pad('Nombre', nameWidth) + ' | Precio';
  const sep = '-'.repeat(header.length);

  const rows = slice.map(p => {
    const id = pad(p?.id ?? '', idWidth);
    const name = pad(p?.name ?? 'Producto', nameWidth);
    const price = p?.price != null ? `$${Number(p.price).toFixed(2)}` : '';
    return `${id} | ${name} | ${price}`;
  });

  return [
    `Encontré ${total} producto${total > 1 ? 's' : ''}${total > limit ? ` (muestro ${limit})` : ''}:`,
    '```',
    header,
    sep,
    ...rows,
    '```'
  ].join('\n');
}

function pad(str, width) {
  str = String(str);
  return str + ' '.repeat(Math.max(0, width - str.length));
}

export function formatCart(resp) {
  const items = resp?.items ?? [];
  if (!items.length) return 'Carrito creado (sin ítems).';
  const lines = items.map(i => {
    const name = i?.name ?? `#${i.product_id}`;
    const qty = i?.qty ?? 0;
    const price = i?.price != null ? ` — $${Number(i.price).toFixed(2)}` : '';
    return `- ${name} x${qty}${price}`;
  });
  return ['Carrito creado:', ...lines].join('\n');
}
