import { isValidObjectId, Model, UpdateQuery } from 'mongoose';
import { ErrorTypes } from '../erros/catalog';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  static checkId(_id: string): true {
    if (!isValidObjectId(_id)) throw Error(ErrorTypes.InvalidMongoId);

    return true;
  }
  
  async create(obj: T): Promise<T> {
    return this._model.create(obj);
  }

  async read(): Promise<T[]> {
    return this._model.find();
  }

  async readOne(_id: string): Promise<T | null> {
    MongoModel.checkId(_id);
    
    return this._model.findById(_id);
  }

  async update(_id: string, obj: T): Promise<T | null> {
    MongoModel.checkId(_id);
    
    return this._model.findByIdAndUpdate(
      _id,
      obj as UpdateQuery<T>,
      { new: true },
    );
  }
  
  async delete(_id: string): Promise<T | null> {
    MongoModel.checkId(_id);
    
    return this._model.findByIdAndRemove(_id);
  }
}

export default MongoModel;