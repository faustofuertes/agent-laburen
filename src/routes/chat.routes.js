import { Router } from 'express';
import { getUI, postChat } from '../controllers/chat.controller.js';
const router = Router();

router.get('/', getUI);
router.post('/chat', postChat);

export default router;