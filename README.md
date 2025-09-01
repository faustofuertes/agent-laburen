# 🤖 Agente Laburen.com
Agente conversacional de **ecommerce** que interactúa con la [API Laburen](https://github.com/faustofuertes/api-laburen).  
Permite consultar productos, crear un carrito y modificarlo desde una interfaz de chat simple.

---

## 🚀 Demo
- **Agente Web:** [https://agent-laburen.onrender.com](https://agent-laburen.onrender.com)  
- **API Backend:** [https://api-laburen.onrender.com](https://api-laburen.onrender.com)  
- **WhatsApp (prueba):** desplegado en número de prueba vía **WhatsApp Cloud API**  
  > ⚠️ Para probarlo desde este medio es necesario verificar el numero previamente en Meta.  

---

## ⚙️ Instalación local
1. **Clonar este repo**
   ```bash
   git clone https://github.com/faustofuertes/agent-laburen.git
   cd agent-laburen

2. **Instalar dependencias**
   ```bash
   npm install

4. **Configurar variables de entorno (.env)**
   GOOGLE_API_KEY=tu_api_key_google  # Generar en https://aistudio.google.com/app/apikey
   BACKEND_URL=https://api-laburen.onrender.com

3. **Iniciar el servidor**
   ```bash
   npm run dev
   
   Abrir en el navegador: http://localhost:8788

---

## 📖 Documentación
Toda la arquitectura y diagramas están en /docs:
Arquitectura del Agente
Arquitectura de la API
Flujo de interacción (diagrama)

---

## 📝 Notas
Este repo contiene solo el Agente con UI.
La API Backend está en un repo separado: api-laburen.