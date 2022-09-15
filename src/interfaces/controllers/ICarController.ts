import { Request, Response } from 'express';

export interface ICarController{
  create(req: Request, res: Response): void
}