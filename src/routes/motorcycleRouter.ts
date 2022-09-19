import express from 'express';
import MotorcycleController from '../controllers/motorcycleController';
import MotorcycleModel from '../models/motorcycleModel';
import MotorcycleService from '../services/motorcycleService';

const motorcycleRouter = express.Router();

const motorcycleModel = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorcycleController(motorcycleService);

motorcycleRouter.post('/', (req, res) => motorcycleController.create(req, res));
motorcycleRouter.get('/', (req, res) => motorcycleController.read(req, res));
motorcycleRouter.get('/:id', (req, res) => motorcycleController.readOne(req, res));
motorcycleRouter.delete('/:id', (req, res) => motorcycleController.delete(req, res));
motorcycleRouter.put('/:id', (req, res) => motorcycleController.update(req, res));

export default motorcycleRouter;