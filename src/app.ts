import express from 'express';
import 'express-async-errors';
import carRouter from './routes/carRouter';
import errorHandler from './middlewares/error';
import motorcycleRouter from './routes/motorcycleRouter';

const app = express();
app.use(express.json());

// Rotas
app.use('/cars', carRouter);
app.use('/motorcycles', motorcycleRouter);

// Middleware de error
app.use(errorHandler);

export default app;
