import CrudService from './crudService';
import { IMotorcycle,
  IMotorcycleUpdate,
  MotorcycleUpdateZodSchema,
  MotorcycleZodSchema } from '../interfaces/IMotorcycle';
import MongoModel from '../models/mongoModel';

export default class MotorcycleService extends CrudService<IMotorcycle, IMotorcycleUpdate> {
  constructor(model: MongoModel<IMotorcycle>) {
    super(model, MotorcycleZodSchema, MotorcycleUpdateZodSchema);
  }
}