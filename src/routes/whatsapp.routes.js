import { Router } from "express";
import { incomingMessageController } from "../controllers/whatsapp.controller.js";

const router = Router();

router.post("/webhook", incomingMessageController);

export default router;