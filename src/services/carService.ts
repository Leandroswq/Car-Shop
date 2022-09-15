import { CarUpdateZodSchema, CarZodSchema, ICar, ICarUpdate } from '../interfaces/ICar';
import MongoModel from '../models/mongoModel';
import CrudService from './crudService';

export default class CarService extends CrudService<ICar, ICarUpdate> {
  constructor(model: MongoModel<ICar>) {
    super(model, CarZodSchema, CarUpdateZodSchema);
  }
}