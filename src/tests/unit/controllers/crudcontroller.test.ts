import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import TestCrudService from '../services/testeCrudService';
import TesteCrudController from './testeCrudController';
import { testMockWithId } from '../../mocks/mongoTestModelMocks';
const { expect } = chai;

describe('Crud Controller', () => {
  const crudService = new TestCrudService()
  const crudController = new TesteCrudController(crudService)

  let res = {} as Response;
  let req = {} as Request;

  before(async () => {
    req.body = {}
    req.params = {}
    
    res.status = (_status) => res
    res.json = (jsonMessage) => jsonMessage 
  });

  after(()=>{
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
    })
  })

});