import * as sinon from 'sinon';
import chai from 'chai';
import { Model} from 'mongoose';
import MongoTesteModel from './mongoTesteModel';
import { testMock, testMockWithId } from '../../mocks/mongoTestModelMocks';

const { expect } = chai;


describe('mongoTestModel', () => {
  const mongoModel = new MongoTesteModel()

  afterEach(()=>{
    sinon.restore();
  })

  describe("Criação de um documento", () =>{
    it("Criado com sucesso", async () => {
      const createStub = sinon.stub(Model, 'create').resolves(testMockWithId) 

      const response = await mongoModel.create(testMock)

      expect(createStub.calledWith(testMock)).to.be.true
      expect(response).to.equal(testMockWithId)
    })
  })

  

});