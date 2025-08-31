# 🤖 Agente Laburen.com

Agente conversacional de **ecommerce** que interactúa con una **API propia** creada específicamente para este challenge.  
Permite consultar productos, crear un carrito y modificarlo desde una interfaz de chat simple.

---

## 🚀 Demo

- **Agente (UI Web):** [https://agent-laburen.onrender.com](https://agent-laburen.onrender.com)  
- **API Backend (dependencia):** [https://api-laburen.onrender.com](https://api-laburen.onrender.com)  
- **Integración WhatsApp (número de prueba):** desplegado en un número de prueba con **WhatsApp Cloud API**.  

⚠️ **Nota:** Para interactuar con él desde otro número, primero es necesario verificarlo en Meta. No se puede probar libremente hasta que se autorice.

---

## 🧩 Funcionalidad

El agente entiende **lenguaje natural en español** y puede:

- 🔍 **Consultar productos** disponibles.  
- 🛒 **Crear un carrito** al agregar un producto por primera vez.  
- ✏️ **Modificar un carrito existente**: agregar, actualizar o eliminar items.  
- 💬 Responder a **preguntas informativas** (ej: “¿vendés sudaderas?”) sin pedir ID.  
- ✅ Solicitar **product_id** solo cuando es necesario modificar el carrito.  

---

## 📂 Estructura

src/
├── controllers/ # Controladores del agente
├── routes/ # Rutas del agente (ej: /chat)
├── services/ # Servicios externos (API propia, Gemini)
├── UI/ # Interfaz del chat (HTML + CSS + JS embebido)
├── utils/ # Formatters de texto para las respuestas
├── config.js # Configuración de entorno
└── index.js # Servidor Express que sirve la UI y las rutas

---

## ⚙️ Uso local

1. **Clonar este repo:**
   ```bash
   git clone https://github.com/faustofuertes/agent-laburen.git
   cd agent-laburen
Instalar dependencias:

npm install
Configurar variables de entorno (.env):

env
GOOGLE_API_KEY=tu_api_key_google  # Generar en https://aistudio.google.com/app/apikey
BACKEND_URL=https://api-laburen.onrender.com
Iniciar el servidor:

npm run dev
Abrir en el navegador: http://localhost:8788

📝 Notas
Este repo contiene el Agente con UI.

La API Backend está en un repo aparte: api-laburen.

La Base de datos está hosteada en Neon.