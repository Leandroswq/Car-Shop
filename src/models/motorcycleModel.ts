import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './mongoModel';

const motorCycleMongooseSchema = new Schema<IMotorcycle>({
  status: Boolean,
  buyValue: Number,
  color: String,
  model: String,
  year: Number,
  category: ['Street', 'Custom', 'Trail'],
  engineCapacity: Number,
}, {
  versionKey: false,
});

export default class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('motorcycle', motorCycleMongooseSchema)) {
    super(model);
  }
}