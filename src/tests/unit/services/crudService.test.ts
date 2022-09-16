import * as sinon from 'sinon';
import chai from 'chai';
import TestCrudService from './testeCrudService';
import MongoTesteModel from '../models/mongoTesteModel';
import { testMock, testMockId, testMockWithId } from '../../mocks/mongoTestModelMocks';
import CrudService from '../../../services/crudService';
import { checkZodSchema } from '../../../helpers/zod';
const { expect } = chai;

describe('CrudService', () => {
  const mongoTesteModel = new MongoTesteModel()
  const crudService = new TestCrudService(mongoTesteModel)

  afterEach(() => {
    sinon.restore();
  })

  describe("Lança um erro ObjectNotFound, caso o objeto não exista no DB", () => {
    it("Caso o Objeto exista no DB retorne true", () => {
      const response = CrudService.objectExist(testMock)

      expect(response).to.true
    })

    it("Caso o id seja invalido lança um erro do tipo 'InvalidMongoId'", async () => {
      try {
        const response = CrudService.objectExist(null)
        expect.fail("O erro não foi lançado corretamente")
      } catch ({message}) {

        expect(message).to.equal('ObjectNotFound')
      }
    })
  })

  describe("Criação de um documento", () => {
    it("Caso de sucesso", async () => {
      const createStub = sinon.stub(mongoTesteModel, 'create')
      .resolves(testMockWithId)

      const response = await crudService.create(testMock)

      expect(createStub.calledWith(testMock)).to.be.true
      expect(response).to.equal(testMockWithId)
    })
  })


  describe("Busca de todos os documentos", async () => {
    it("Caso de sucesso", async () => {
      const findStub = sinon.stub(mongoTesteModel, 'read').resolves([testMockWithId])

      const response = await crudService.read()

      expect(findStub.calledWith()).to.be.true
      expect(response).to.deep.equal([testMockWithId])
    })
  })

  describe("Busca um documento pelo id", async () => {
    it("Caso de sucesso", async () => {
      const findStub = sinon.stub(mongoTesteModel, 'readOne').resolves(testMockWithId)

      const existMock = sinon.stub(CrudService, 'objectExist').returns(true)

      const response = await crudService.readOne(testMockId)

      expect(findStub.calledWith(testMockId)).to.be.true
      expect(existMock.calledWith(testMockWithId)).to.be.true
      expect(response).to.deep.equal(testMockWithId)
    })
  })

})

