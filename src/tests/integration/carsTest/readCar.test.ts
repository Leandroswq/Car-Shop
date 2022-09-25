import * as sinon from 'sinon';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'mongoose';
import app from '../../../app';
import * as carMock from '../../mocks/carsMocks'


chai.use(chaiHttp);
const { expect } = chai;
const request = () => chai
  .request(app).get('/cars').send()

describe("Endpoint /cars do tipo get", () => {
  beforeEach(() => {
    sinon.restore()
  })

  it('É possível listar todos os carros com sucesso', async () => {
    const readStub = sinon.stub(Model, 'find').resolves([carMock.validCarWithId])

    const response = await request()

    expect(response.status).to.equal(200)
    expect(response.body).to.be.deep.equal([carMock.validCarWithId])
    expect(readStub.calledOnce).to.be.true
  })

  it('Retorna uma lista vazia caso não exista carros', async () => {
    const readStub = sinon.stub(Model, 'find').resolves([])

    const response = await request()

    expect(response.status).to.equal(200)
    expect(response.body).to.be.deep.equal([])
    expect(readStub.calledOnce).to.be.true
  })

})