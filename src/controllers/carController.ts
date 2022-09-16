import { ICar, ICarUpdate } from '../interfaces/ICar';
import CrudController from './crudController';
import CrudService from '../services/crudService';

export default class CarController extends CrudController<ICar, ICarUpdate> {
  // Variável abaixo é necessária para evitar um falso positivo do lint
  private linter: number;

  constructor(service: CrudService<ICar, ICarUpdate>) {
    super(service);
    // A atribuição abaixo é necessária para evitar um falso positivo do lint
    this.linter = 0;
  }
}