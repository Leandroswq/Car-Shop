import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import MongoTesteModel from './mongoTesteModel';
import { testMock, testMockId, testMockWithId } from '../../mocks/mongoTestModelMocks';
import MongoModel from '../../../models/mongoModel';

const { expect } = chai;


describe('mongoTestModel', () => {
  const mongoModel = new MongoTesteModel()

  afterEach(() => {
    sinon.restore();
  })

  describe("Validação do id", () => {
    it("Caso o id seja valido retorna true", () => {
      const response = MongoTesteModel.checkId(testMockId)

      expect(response).to.be.true
    })

    it("Caso o id seja invalido lança um erro do tipo 'InvalidMongoId'", async () => {
      try {
        const response = MongoTesteModel.checkId('s')
        expect.fail("O erro não foi lançado corretamente")
      } catch ({message}) {

        expect(message).to.equal('InvalidMongoId')
      }
    })
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
      const checkIdStub = sinon.stub(MongoModel, 'checkId').returns(true)

      const response = await mongoModel.readOne(testMockId)

      expect(checkIdStub.calledWith(testMockId)).to.be.true

      expect(findByIdStub.calledWith()).to.be.true
      expect(response).to.deep.equal(testMockWithId)
    })
  })

  describe("Atualização de um documento pelo ID", async () => {
    it("Caso de sucesso", async () => {
      const updateStub = sinon.stub(Model, 'findByIdAndUpdate').resolves(testMockWithId)
  
      const checkIdStub = sinon.stub(MongoModel, 'checkId').returns(true)
  
      const response = await mongoModel.update(testMockId , testMock)
  
      expect(checkIdStub.calledWith(testMockId)).to.be.true
  
      expect(updateStub.calledWith(testMockId, testMock)).to.be.true
      expect(response).to.deep.equal(testMockWithId)
    })
  
  })

  describe("Remoção de um documento pelo ID", async () => {
    it("Caso de sucesso", async () => {
      const updateStub = sinon.stub(Model, 'findByIdAndRemove').resolves(testMockWithId)
  
      const checkIdStub = sinon.stub(MongoModel, 'checkId').returns(true)
  
      const response = await mongoModel.delete(testMockId)
  
      expect(checkIdStub.calledWith(testMockId)).to.be.true
  
      expect(updateStub.calledWith(testMockId)).to.be.true
      expect(response).to.deep.equal(testMockWithId)
    })

  })
})

