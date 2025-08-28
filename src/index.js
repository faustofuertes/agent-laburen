import 'dotenv/config';
import express from 'express';
import chatRouter from './routes/chat.routes.js';
import { PORT } from './config.js';

const app = express();
app.use(express.json());
app.use('/', chatRouter);

app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});
