import { Request, Response } from 'express';
import { ICRudController } from '../interfaces/ICrudeController';
import { IServiceCrud } from '../interfaces/IService';

export default abstract class CrudController<T> implements ICRudController<T> {
  protected _service: IServiceCrud<T>;

  constructor(service:IServiceCrud<T>) {
    this._service = service;
  }
  async create(req: Request, res: Response): Promise<Response<T>> {
    const { body } = req;
    const response = await this._service.create(body);
    return res.status(201).json(response);
  }

  read(req: Request, res: Response): Promise<Response<T[]>> {
    throw new Error('Method not implemented.');
  }

  readOne(req: Request, res: Response): Promise<Response<T>> {
    throw new Error('Method not implemented.');
  }

  update(req: Request, res: Response): Promise<Response<T>> {
    throw new Error('Method not implemented.');
  }

  delete(req: Request, res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
}