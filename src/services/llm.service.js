import { GoogleGenerativeAI } from '@google/generative-ai';
import { GOOGLE_API_KEY } from '../config.js';

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

const tools = [{
  functionDeclarations: [
    {
      name: "list_products",
      description: "Lista productos. q: palabra/frase corta (<=40), minúsculas, sin acentos, singular. q=\"\" = todo el catálogo.",
      parameters: { type: "OBJECT", properties: { q: { type: "STRING" } } }
    },
    {
      name: "create_cart",
      description: "Crea un carrito con items iniciales. items = [{ product_id, qty>0 }]. Usar cuando el usuario pida comprar/agregar por primera vez y no exista un carrito ya existente.",
      parameters: {
        type: "OBJECT",
        properties: {
          items: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                product_id: { type: "NUMBER" },
                qty: { type: "NUMBER" }
              },
              required: ["product_id", "qty"]
            }
          }
        },
        required: ["items"]
      }
    },
    {
      name: "update_cart",
      description: "Agrega/actualiza/elimina items de un carrito existente (qty=0 elimina).",
      parameters: {
        type: "OBJECT",
        properties: {
          cartId: { type: "NUMBER" },
          items: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                product_id: { type: "NUMBER" },
                qty: { type: "NUMBER" }
              },
              required: ["product_id", "qty"]
            }
          }
        },
        required: ["cartId", "items"]
      }
    }
  ]
}];

const SYSTEM_TEXT = `
Sos Fufa un agente de ecommerce.
Tareas:
1) Consultar productos.
2) Crear carrito cuando el usuario compra por primera vez.
3) Modificar un carrito existente (agregar/actualizar/eliminar items).

Funciones:
- list_products({ q }): lista productos. q en minúsculas, sin acentos, singular. Si quieren todo, q="".
- create_cart({ items }): crea carrito con items iniciales. Unicamente se usa la primera vez que el cleinte agrega productos a su carrito. items = [{ product_id, qty>0 }].
- update_cart({ cartId, items }): modifica carrito existente. Se usa cuando el cliente quiere agregar/modificar/eliminar productos de un carrito de que ya existe. qty=0 elimina el producto.

Decisión:
- "mostrar/listar/buscar" → list_products.
- "quiero comprar/agregar/sumar" y NO EXISTE un carrito aún → create_cart.
- "agregá/actualizá/eliminá/cambiá cantidad" y YA hay carrito → update_cart.
- Si el usuario pregunta de forma informativa (ej: "¿vendés sudaderas?", "mostrame remeras negras", "¿tenés talles M?"), NO pidas el product_id. Respondé mostrando resultados y, si corresponde, listá productos con nombre + precio + ID para que el usuario pueda elegir después.
- Si el usuario quiere modificar el carrito (ej: "agregá X", "sumá al carrito", "cambiá cantidad", "sacá del carrito") y no da un product_id, entonces pedí el ID. Si da solo el nombre, mostrá los productos encontrados con sus IDs y pedí que confirme cuál usar. Nunca inventes IDs.
Parámetros por defecto:
- Si omiten cantidad, asumí qty=1.
- CartId actual: {{cartId}} (usalo en update_cart cuando corresponda).

Respondé siempre en español y conciso.`;

export async function runLLM(message) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    tools,
    systemInstruction: { role: 'system', parts: [{ text: SYSTEM_TEXT }] }
  });

  const resp = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: message }] }],
    generationConfig: { temperature: 0 }
  });

  const cand = resp.response.candidates?.[0];
  const part = cand?.content?.parts?.find(p => p.functionCall || p.text);

  if (part?.functionCall) {
    return { kind: 'function', name: part.functionCall.name, args: part.functionCall.args || {} };
  }
  return { kind: 'text', text: resp.response.text() || '' };
}
