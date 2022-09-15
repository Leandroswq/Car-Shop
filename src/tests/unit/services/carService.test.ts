import * as sinon from 'sinon';
import chai from 'chai';
import CarService from '../../../services/carService';
import CarModel from '../../../models/carModel';
const { expect } = chai;

describe('Car Service', () => {
  const carModel = new CarModel()
  const carService = new CarService(carModel)
  afterEach(()=>{
    sinon.restore();
  })

  it("Testa se Car Service é uma instancia de CrudService", () => {
    expect(carService).instanceOf(CarService)
  })

});