// index.ts

import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config(); // .env ファイルの読み込み

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

// CORS ミドルウェアを適用
app.use(cors({
  origin: [process.env.DEV_ORIGIN || '', process.env.PROD_ORIGIN || ''],
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/todos', async (req, res) => {
  const result = await prisma.todo.findMany();

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Running the app on port: ${PORT}`);
});
