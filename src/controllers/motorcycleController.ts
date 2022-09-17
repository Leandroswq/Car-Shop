import { IMotorcycle, IMotorcycleUpdate } from '../interfaces/IMotorcycle';
import CrudService from '../services/crudService';
import CrudController from './crudController';

export default class MotorcycleController extends CrudController<IMotorcycle, IMotorcycleUpdate> {
  // Variável abaixo é necessária para evitar um falso positivo do lint
  private linter: number;
    
  constructor(service: CrudService<IMotorcycle, IMotorcycleUpdate>) {
    super(service);
    // A atribuição abaixo é necessária para evitar um falso positivo do lint
    this.linter = 0;
  }
}