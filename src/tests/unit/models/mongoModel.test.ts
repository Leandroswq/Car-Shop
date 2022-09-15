import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import MongoTesteModel from './mongoTesteModel';
import { testMock, testMockWithId } from '../../mocks/mongoTestModelMocks';

const { expect } = chai;


describe('mongoTestModel', () => {
  const mongoModel = new MongoTesteModel()

  afterEach(() => {
    sinon.restore();
  })

  describe("Criação de um documento", () => {
    it("Caso de sucesso", async () => {
      const createStub = sinon.stub(Model, 'create').resolves(testMockWithId)

      const response = await mongoModel.create(testMock)

      expect(createStub.calledWith(testMock)).to.be.true
      expect(response).to.equal(testMockWithId)
    })
  })

  describe("Busca de todos os documentos", async () => {
    it("Caso de sucesso", async () => {
      const findStub = sinon.stub(Model, 'find').resolves([testMockWithId])

      const response = await mongoModel.read()

      expect(findStub.calledWith()).to.be.true
      expect(response).to.deep.equal([testMockWithId])
    })
  })

  describe("Busca de um documento pelo ID", async () => {
    it("Caso de sucesso", async () => {
      const findByIdStub = sinon.stub(Model, 'findById').resolves(testMockWithId)

      const response = await mongoModel.readOne(testMockWithId._id)

      expect(findByIdStub.calledWith()).to.be.true
      expect(response).to.deep.equal(testMockWithId)
    })

    it("Caso um id incompatível seja passado", async () => {
      const findByIdStub = sinon.stub(Model, 'findById').resolves(testMockWithId)

      try {
        const response = await mongoModel.readOne('dd')
        expect.fail("O erro não foi lançado corretamente")
      } catch ({message}) {

        expect(message).to.equal('InvalidMongoId')
        expect(findByIdStub.called).to.be.false
      }
    })
  })


});