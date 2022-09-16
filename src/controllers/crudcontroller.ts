import { Request, Response } from 'express';
import { ICRudController } from '../interfaces/ICrudeController';
import CrudService from '../services/crudService';

export default abstract class CrudController<T, U> implements ICRudController<T> {
  protected _service: CrudService<T, U>;

  constructor(service:CrudService<T, U>) {
    this._service = service;
  }
  async create(req: Request, res: Response): Promise<Response<T>> {
    const { body } = req;
    const response = await this._service.create(body);
    return res.status(201).json(response);
  }

  async read(req: Request, res: Response): Promise<Response<T[]>> {
    const response = await this._service.read();

    return res.status(200).json(response);
  }

  async readOne(req: Request, res: Response): Promise<Response<T>> {
    const { id } = req.params;

    const response = await this._service.readOne(id);

    return res.status(200).json(response); 
  }

  async update(req: Request, res: Response): Promise<Response<T>> {
    const { id } = req.params;
    const { body } = req;

    const response = await this._service.update(id, body);

    return res.status(200).json(response); 
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this._service.delete(id);

    return res.sendStatus(204);
  }
}