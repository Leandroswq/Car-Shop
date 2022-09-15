import {  model, Schema } from 'mongoose';
import MongoModel from '../../../models/mongoModel';


const testModelSchema = new Schema<{name:string}>({
  name: String
})

export default class MongoTesteModel extends MongoModel<{name: string}>{
  constructor(modelTeste = model('__mongoTesteModel', testModelSchema)){
    super(modelTeste)
  }
}
