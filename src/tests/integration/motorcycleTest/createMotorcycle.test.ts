import * as sinon from 'sinon';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'mongoose';
import app from '../../../app';
import * as motorcycleMocks from '../../mocks/motorcycleMocks'


chai.use(chaiHttp);
const { expect } = chai;
const request = (value: string | object | undefined) => chai
  .request(app).post('/motorcycles').send(value)

describe("Endpoint /motorcycles do tipo post", () => {
  beforeEach(() => {
    sinon.restore()
  })

  it('É possível adicionar uma moto se todos os parâmetros estiverem corretos', async () => {
    const createStub = sinon.stub(Model, 'create').resolves(motorcycleMocks.validMotorcycleWithId)
    const response = await request(motorcycleMocks.validMotorcycle)

    expect(response.status).to.equal(201)
    expect(response.body).to.be.deep.equal(motorcycleMocks.validMotorcycleWithId)
    expect(createStub.calledOnce).to.be.true
  })

  it('Retorna um erro 400 caso o objeto esteja vazio', async () => {
    const createStub = sinon.stub(Model, 'create').resolves(motorcycleMocks.validMotorcycleWithId)
    const response = await request({})

    expect(response.status).to.equal(400)
    expect(createStub.called).to.be.false
  })

  it('Retorna erro 400 ao tentar criar uma moto com category diferente de "Street", "Custom" ou "Trail"', async () => {
    const createStub = sinon.stub(Model, 'create').resolves(motorcycleMocks.validMotorcycleWithId)
    const response = await request(motorcycleMocks.MotorcycleWrongCategory)

    expect(response.status).to.equal(400)
    expect(createStub.called).to.be.false
  })

  it('Retorna erro 400 ao tentar criar uma moto com category diferente de "string"', async () => {
    const createStub = sinon.stub(Model, 'create').resolves(motorcycleMocks.validMotorcycleWithId)
    const response = await request(motorcycleMocks.MotorcycleCategoryNotString)

    expect(response.status).to.equal(400)
    expect(createStub.called).to.be.false
  })

  it('Retorna erro 400 ao tentar criar uma moto com engineCapacity menor ou igual a zero', async () => {
    const createStub = sinon.stub(Model, 'create').resolves(motorcycleMocks.validMotorcycleWithId)
    const response = await request(motorcycleMocks.MotorcycleEngineLteZero)

    expect(response.status).to.equal(400)
    expect(createStub.called).to.be.false
  })

  it('Retorna erro 400 ao tentar criar uma moto com engineCapacity maior que 2500', async () => {
    const createStub = sinon.stub(Model, 'create').resolves(motorcycleMocks.validMotorcycleWithId)
    const response = await request(motorcycleMocks.MotorcycleEngineGt2500)

    expect(response.status).to.equal(400)
    expect(createStub.called).to.be.false
  })

  it('Retorna um erro 400 caso ao tentar criar um moto sem algum dos campos "model", "year", "color", "buyValue", "category" e "engineCapacity"', async () => {
    const createStub = sinon.stub(Model, 'create').resolves(motorcycleMocks.validMotorcycleWithId)
    let response = await request(motorcycleMocks.noModelMotorcycle)
    expect(response.status).to.equal(400)

    response = await request(motorcycleMocks.noYearMotorcycle)
    expect(response.status).to.equal(400)

    response = await request(motorcycleMocks.noColorMotorcycle)
    expect(response.status).to.equal(400)

    response = await request(motorcycleMocks.noBuyValueMotorcycle)
    expect(response.status).to.equal(400)

    response = await request(motorcycleMocks.noCategoryMotorcycle)
    expect(response.status).to.equal(400)

    response = await request(motorcycleMocks.noEngineCapacityMotorcycle)
    expect(response.status).to.equal(400)

    expect(createStub.called).to.be.false

  })
})