import CrudController from "../../../controllers/crudController";
import CrudService from "../../../services/crudService";

export default class TesteCrudController extends CrudController<{name: string}, {name?:string}>{
  constructor(service: CrudService<{name: string}, {name?:string}>){
    super(service)
  }
}