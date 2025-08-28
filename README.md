# 🤖 Agente Laburen.com
Agente conversacional de ecommerce que interactúa con API propia creada especificamente para este challenge.  
Permite consultar productos, crear un carrito y modificarlo desde una interfaz de chat simple.

---

## 🚀 Demo
- **Agente (UI Web):** [https://agent-laburen.onrender.com]
- **API Backend (dependencia):** [https://api-laburen.onrender.com]

---

## 🧩 Funcionalidad
El agente entiende lenguaje natural en español y puede:

- **Consultar productos** disponibles.  
- **Crear un carrito** si el usuario agrega un producto por primera vez.  
- **Modificar un carrito existente**: agregar, actualizar o eliminar items.  
- Responder a **preguntas informativas** como “¿vendés sudaderas?” sin pedir ID.  
- Pedir confirmación de **product_id** solo cuando es necesario modificar el carrito.  

---

## 📂 Estructura
src/
    controllers/ # Controladores del agente
    routes/      # Rutas del agente (ej: /chat)
    services/    # Servicios externos que consume (API propia, gemini)
    UI/          # Interfaz del chat (HTML + CSS + JS embebido)
    utils/       # Formatters de texto para las respuestas del chat
    config.js    # Configuración de entorno
    index.js     # Servidor Express que sirve la UI y las rutas


---

## ⚙️ Uso local
1. Clonar este repo:
   git clone https://github.com/faustofuertes/agent-laburen.git
   cd agent-laburen

2. Instalar dependencias:
   npm install

3. Configurar variables de entorno (.env):
  GOOGLE_API_KEY=AIzaSyBIHxyET8z0EkwdEI0XSkYn3z5BzfNE_S0 
  (o generar una propia en [https://aistudio.google.com/app/apikey])
  BACKEND_URL=https://api-laburen.onrender.com

4. Iniciar:
   npm run dev
   Abrí en el navegador: http://localhost:8788

---

## 📝 Notas
Este repo contiene el agente con UI.
La API que consume está en un repo aparte: api-laburen.
La base de datos está hosteada en Neon.