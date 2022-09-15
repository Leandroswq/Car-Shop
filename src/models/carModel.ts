import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './mongoModel';

const carMongooseSchema = new Schema<ICar>({
  status: Boolean,
  buyValue: Number,
  color: String,
  doorsQty: Number,
  model: String,
  seatsQty: Number,
  year: Number,
});

export default class CarModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('cars', carMongooseSchema, 'cars')) {
    super(model);
  }
}
