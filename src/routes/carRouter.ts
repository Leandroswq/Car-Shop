import express from 'express';
import CarController from '../controllers/carController';
import CarModel from '../models/carModel';
import CarService from '../services/carService';

const carRouter = express.Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

carRouter.post('/', (req, res) => carController.create(req, res));
carRouter.get('/', (req, res) => carController.read(req, res));
carRouter.get('/:id', (req, res) => carController.readOne(req, res));
carRouter.delete('/:id', (req, res) => carController.delete(req, res));

export default carRouter;