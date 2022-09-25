import express from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import carRouter from './routes/carRouter';
import errorHandler from './middlewares/error';
import motorcycleRouter from './routes/motorcycleRouter';

const docs = YAML.load('src/swaggerDocs.yml');

const app = express();
app.use(express.json());

// Rotas
app.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));
app.use('/cars', carRouter);
app.use('/motorcycles', motorcycleRouter);

// Middleware de error
app.use(errorHandler);

export default app;
