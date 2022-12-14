import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import TestCrudService from '../services/testeCrudService';
import TesteCrudController from './testeCrudController';
import { testMock, testMockWithId } from '../../mocks/mongoTestModelMocks';
const { expect } = chai;

describe('Crud Controller', () => {
  const crudService = new TestCrudService()
  const crudController = new TesteCrudController(crudService)

  let res = {} as Response;
  let req = {} as Request;

  beforeEach(async () => {
    req.body = {}
    req.params = {}
    
    res.status = (_status) => res
    res.json = (jsonMessage) => jsonMessage 
    res.sendStatus = (_status) => res
  });

  afterEach(()=>{
    sinon.restore();
  })

  describe('Criação de um documento', () => {
    it('Caso de Sucesso', async  () => {
      const statusSpy = sinon.spy(res, 'status')
      const jsonSpy = sinon.spy(res, 'json')

      const createStub = sinon.stub(crudService, 'create')
      .resolves(testMockWithId)

      await crudController.create(req, res)

      expect(statusSpy.calledWith(201)).to.be.true
      expect(jsonSpy.calledWith(testMockWithId)).to.be.true
      expect(createStub.called).to.be.true
    })
  })

  describe('Busca de todos os documentos', () => {
    it('Caso de Sucesso', async  () => {
      const statusSpy = sinon.spy(res, 'status')
      const jsonSpy = sinon.spy(res, 'json')

      const readStub = sinon.stub(crudService, 'read')
      .resolves([testMockWithId])

      await crudController.read(req, res)

      expect(statusSpy.calledWith(200)).to.be.true
      expect(jsonSpy.calledWith([testMockWithId])).to.be.true
      expect(readStub.called).to.be.true

    })
  })

  describe('Busca um carro no DB pelo id', () => {
    it('Caso de Sucesso', async  () => {
      req.params.id = '5'

      const statusSpy = sinon.spy(res, 'status')
      const jsonSpy = sinon.spy(res, 'json')

      const readOneStub = sinon.stub(crudService, 'readOne')
      .resolves(testMockWithId)
      
      await crudController.readOne(req, res)

      expect(statusSpy.calledWith(200)).to.be.true
      expect(jsonSpy.calledWith(testMockWithId)).to.be.true
      expect(readOneStub.calledWith(req.params.id)).to.be.true
    })
  })

  describe('Atualiza um carro pelo id', () => {
    it('Caso de Sucesso', async  () => {
      req.params.id = '5'
      req.body = testMock

      const statusSpy = sinon.spy(res, 'status')
      const jsonSpy = sinon.spy(res, 'json')

      const updateOneStub = sinon.stub(crudService, 'update')
      .resolves(testMockWithId)
      
      await crudController.update(req, res)

      expect(statusSpy.calledWith(200)).to.be.true
      expect(jsonSpy.calledWith(testMockWithId)).to.be.true
      expect(updateOneStub.calledWith(req.params.id)).to.be.true
    })
  })

  describe('Deleta um carro pelo id', () => {
    it('Caso de Sucesso', async  () => {
      req.params.id = '5'

      const statusSpy = sinon.spy(res, 'sendStatus')

      const deleteStub = sinon.stub(crudService, 'delete')
      .resolves(undefined)
      
      await crudController.delete(req, res)

      expect(statusSpy.calledWith(204)).to.be.true
      expect(deleteStub.calledWith(req.params.id)).to.be.true
    })
  })

});