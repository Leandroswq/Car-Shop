import * as sinon from 'sinon';
import chai from 'chai';
import CarService from '../../../services/carService';
import CarModel from '../../../models/carModel';
import CarController from '../../../controllers/carController';
import CrudController from '../../../controllers/crudController';
const { expect } = chai;

describe('Car controller', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel)
  const carController = new CarController(carService)
  afterEach(()=>{
    sinon.restore();
  })

  it("Testa se CarController é uma instancia de CrudController", () => {
    expect(carController).instanceOf(CrudController)
  })

});