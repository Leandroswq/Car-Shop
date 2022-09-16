import { Schema } from 'zod';
import { ErrorTypes } from '../erros/catalog';
import { checkZodSchema } from '../helpers/zod';
import { IServiceCrud } from '../interfaces/IService';
import MongoModel from '../models/mongoModel';

export default abstract class CrudService<T, U> implements IServiceCrud<T> {
  protected _model: MongoModel<T>;
  protected _zodSchema: Schema<T>;
  protected _updateZodSchema: Schema<U>;

  constructor(
    model: MongoModel<T>,
    zodSchema: Schema<T>, 
    updateZodSchema: Schema<U>,
  ) {
    this._model = model;
    this._zodSchema = zodSchema;
    this._updateZodSchema = updateZodSchema;
  }

  static objectExist<T>(obj: T): true {
    if (!obj) throw new Error(ErrorTypes.ObjectNotFound);

    return true;
  }

  async create(obj: T): Promise<T> {
    checkZodSchema(obj, this._zodSchema);
    const response = await this._model.create(obj);

    return response;
  }

  async read(): Promise<T[]> {
    const response = await this._model.read();

    return response;
  }

  async readOne(_id: string): Promise<T> {
    const response = await this._model.readOne(_id);
    CrudService.objectExist(response);
    return response as T;
  }

  async update(_id: string, obj: U | T): Promise<T> {
    const response = await this._model.update(_id, obj as T);

    CrudService.objectExist(response);
    return response as T;
  }
  
  async delete(_id: string): Promise<void> {
    const response = await this._model.delete(_id);

    CrudService.objectExist(response); 
  }
}