import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './modules/user/user.routes';
import authRoutes from './modules/auth/auth.routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import blogRoutes from './modules/blog/blog.routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/admin/blogs', userRoutes);
app.use('/api/admin/users', userRoutes);

app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
