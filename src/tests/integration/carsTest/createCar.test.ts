import * as sinon from 'sinon';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'mongoose';
import app from '../../../app';
import * as carMock from '../../mocks/carsMocks'


chai.use(chaiHttp);
const { expect } = chai;
const request = (value: string | object | undefined) => chai
  .request(app).post('/cars').send(value)

describe("Endpoint /cars do tipo post", () => {
  beforeEach(() => {
    sinon.restore()
  })

  it('É possível adicionar um carro se todos os parâmetros estiverem corretos', async () => {
    const createStub = sinon.stub(Model, 'create').resolves(carMock.validCarWithId)
    const response = await request(carMock.validCar)

    expect(response.status).to.equal(201)
    expect(response.body).to.be.deep.equal(carMock.validCarWithId)
    expect(createStub.calledOnce).to.be.true
  })

  it('Retorna um erro 400 caso o objeto esteja vazio', async () => {
    const createStub = sinon.stub(Model, 'create').resolves(carMock.validCarWithId)
    const response = await request({})

    expect(response.status).to.equal(400)
    expect(createStub.called).to.be.false
  })

  it('Retorna um erro 400 ao tentar criar um carro com quantidade de assentos inferior a 2', async () => {
    const createStub = sinon.stub(Model, 'create').resolves(carMock.validCarWithId)
    const response = await request(carMock.carSeatsLtTwo)

    expect(response.status).to.equal(400)
    expect(createStub.called).to.be.false
  })

  it('Retorna um erro 400 ao tentar criar um carro com quantidade de assentos superior a 7', async () => {
    const createStub = sinon.stub(Model, 'create').resolves(carMock.validCarWithId)
    const response = await request(carMock.carSeatsGtSeven)

    expect(response.status).to.equal(400)
    expect(createStub.called).to.be.false
  })

  it('Retorna um erro 400 ao tentar criar um carro com quantidade de portas inferior a 2', async () => {
    const createStub = sinon.stub(Model, 'create').resolves(carMock.validCarWithId)
    const response = await request(carMock.carDoorsLtTwo)

    expect(response.status).to.equal(400)
    expect(createStub.called).to.be.false
  })

  it('Retorna um erro 400 ao tentar criar um carro com quantidade de portas superior a 4', async () => {
    const createStub = sinon.stub(Model, 'create').resolves(carMock.validCarWithId)
    const response = await request(carMock.carDoorsGtFour)

    expect(response.status).to.equal(400)
    expect(createStub.called).to.be.false
  })

  it('Retorna um erro 400 caso ao tentar criar um carro sem algum dos campos "model", "year", "color", "buyValue", "doorsQty e "seatsQty"', async () => {
    const createStub = sinon.stub(Model, 'create').resolves(carMock.validCarWithId)
    let response = await request(carMock.noModelCar)
    expect(response.status).to.equal(400)

    response = await request(carMock.noYearCar)
    expect(response.status).to.equal(400)

    response = await request(carMock.noColorCar)
    expect(response.status).to.equal(400)

    response = await request(carMock.noBuyValueCar)
    expect(response.status).to.equal(400)

    response = await request(carMock.noDoorsCar)
    expect(response.status).to.equal(400)

    response = await request(carMock.noSeatsCar)
    expect(response.status).to.equal(400)

    expect(createStub.called).to.be.false

  })
})