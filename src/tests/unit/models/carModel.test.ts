import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/carModel';
import { Model } from 'mongoose';
import MongoModel from '../../../models/mongoModel';

const { expect } = chai;


describe('Car Model', () => {
  const carModel = new CarModel()

  afterEach(()=>{
    sinon.restore();
  })

  it("Testa se Car Model é uma instancia de mongoModel", () => {
    expect(carModel).instanceOf(MongoModel)
  })

});