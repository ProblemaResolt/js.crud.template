import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

// JSONおよびURLエンコードされたデータのパースを有効にする
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: [process.env.DEV_ORIGIN || '', process.env.PROD_ORIGIN || ''],
  credentials: true,
  optionsSuccessStatus: 200,
}));
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/api/todos', async (req: Request, res: Response) => {
  const result = await prisma.todo.findMany();
  res.json(result);
});

app.post('/api/todos', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, completed } = req.body;
    const newTodo = await prisma.todo.create({
      data: {
        title,
        completed,
      },
    });
    res.json(newTodo);
  } catch (error) {
    next(error);
  }
});

app.put('/api/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,
        completed,
      },
    });
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/todos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.todo.delete({
      where: { id: parseInt(id, 10) },
    });
    res.json({ message: 'Todoを削除しました' });
  } catch (error) {
    next(error);
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Running the app on port: ${PORT}`);
});


function next(error: unknown) {
  throw new Error('Function not implemented.');
}