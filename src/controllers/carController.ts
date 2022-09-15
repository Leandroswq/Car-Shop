import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { ICarController } from '../interfaces/controllers/ICarController';
import { IServiceCreate } from '../interfaces/IService';

export default class CarController implements ICarController {
  protected _service: IServiceCreate<ICar>;

  constructor(service: IServiceCreate<ICar>) {
    this._service = service;
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    const response = await this._service.create(body);
    return res.status(201).json(response);
  }
}
