import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import chatRouter from './routes/chat.routes.js';
import whatsappRouter from "./routes/whatsapp.routes.js";
import { PORT } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use('/', chatRouter);
app.use("/", whatsappRouter);
app.use(express.static(path.join(__dirname, './UI')));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, './UI') });
});

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});