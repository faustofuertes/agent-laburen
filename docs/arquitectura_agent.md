\# 🤖 Agente Laburen · Arquitectura & Funcionalidad

\#\# 1\. Arquitectura de Alto Nivel

El \*\*Agente Laburen\*\* es un chatbot de ecommerce que entiende \*\*lenguaje natural en español\*\* y se conecta a la \*\*API Laburen\*\* para consultar productos y manejar carritos.

\*\*Componentes:\*\*  
\- \*\*LLM (Gemini API):\*\* interpreta mensajes y detecta intención.    
\- \*\*Servidor Express (Vercel / Render):\*\* expone \`/chat\` y sirve la UI de conversación.    
\- \*\*Controladores:\*\* procesan mensajes y llaman a servicios externos.    
\- \*\*Servicios:\*\* conexión con la API Backend (\`/products\`, \`/carts\`).    
\- \*\*UI Web:\*\* chat simple (HTML \+ CSS \+ JS embebido).    
\- \*\*Canales externos:\*\*    
  \- Web (Vercel).    
  \- WhatsApp Cloud API (número de prueba).  

\*\*Flujo general:\*\*  
1\. Usuario escribe (Web o WhatsApp).    
2\. Agente procesa con LLM.    
3\. Si necesita datos → consulta API Backend.    
4\. Responde al usuario en lenguaje natural.  

\---

\#\# 2\. Funcionalidad principal

\- 🔍 \*\*Consultar productos\*\* → usando \`GET /products\`.    
\- 🛒 \*\*Crear carrito\*\* → cuando el usuario agrega un producto (\`POST /carts\`).    
\- ✏️ \*\*Modificar carrito\*\* → agregar, actualizar o eliminar (\`PATCH /carts/:cartId\`).    
\- 💬 \*\*Respuestas informativas\*\* → consultas generales (“¿tenés sudaderas?”).    
\- ✅ \*\*Uso de product\_id\*\* → solo si el usuario edita un carrito.  

\---

\#\# 3\. Resumen

El \*\*Agente Laburen\*\* actúa como puente entre el usuario y la API:    
\- LLM interpreta la intención.    
\- El servidor Express gestiona la lógica y consume la API.    
\- La UI Web y WhatsApp Cloud API son los canales de interacción.  

Este diseño modular permite \*\*escalar fácilmente\*\* a nuevos canales y extender funciones (ej: pagos, historial de usuarios).

