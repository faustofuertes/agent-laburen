import { Router } from "express";
import { verifyWebhookController, incomingMessageController } from "../controllers/whatsapp.controller.js";

const router = Router();

router.get("/webhook", verifyWebhookController);   // verificación inicial de Meta
router.post("/webhook", incomingMessageController); // recepción de mensajes

export default router;