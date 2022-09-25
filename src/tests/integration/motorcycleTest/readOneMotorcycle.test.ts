import * as sinon from 'sinon';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'mongoose';
import app from '../../../app';
import * as motorcycleMocks from '../../mocks/motorcycleMocks'


chai.use(chaiHttp);
const { expect } = chai;
const request = (url = motorcycleMocks.validMotorcycleWithId._id) => chai
  .request(app).get(`/motorcycles/${url}`).send()

describe("Endpoint /motorcycles/:id do tipo get", () => {
  beforeEach(() => {
    sinon.restore()
  })

  it('É possível listar 1 moto pelo id com sucesso', async () => {
    const readStub = sinon.stub(Model, 'findById').resolves(motorcycleMocks.validMotorcycleWithId)

    const response = await request()

    expect(response.status).to.equal(200)
    expect(response.body).to.be.deep.equal(motorcycleMocks.validMotorcycleWithId)
    expect(readStub.calledOnce).to.be.true
  })

  it('Dispara o erro 400 "Id must have 24 hexadecimal characters" caso o id possua menos que 24 caracteres', async () => {
    const messageError = {
      error: "Id must have 24 hexadecimal characters",
    };
    const readStub = sinon.stub(Model, 'findById').resolves()

    const response = await request('s')

    expect(response.status).to.equal(400)
    expect(response.body).to.be.deep.equal(messageError)
    expect(readStub.calledOnce).to.be.false
  })

  it('Dispara o erro 400 "Id must have 24 hexadecimal characters" caso o id possua mais que 24 caracteres', async () => {
    const messageError = {
      error: "Id must have 24 hexadecimal characters",
    }
    const readStub = sinon.stub(Model, 'findById').resolves()

    const response = await request('12345678901234567890123456')

    expect(response.status).to.equal(400)
    expect(response.body).to.be.deep.equal(messageError)
    expect(readStub.calledOnce).to.be.false
  })

  it('Dispara o erro 404 "Object not found" caso o id não exista no banco de dados', async () => {
    const messageError = {
      error: "Object not found",
    }

    const readStub = sinon.stub(Model, 'findById').resolves()
    const response = await request()

    expect(response.status).to.equal(404)
    expect(response.body).to.be.deep.equal(messageError)
    expect(readStub.calledOnce).to.be.true
  })

})