import { z } from "zod";
import CrudService from "../../../services/crudService";
import MongoTesteModel from "../models/mongoTesteModel";

export const nameSchema = z.object({
  name: z.string()
});

export const nameUpdateSchema = z.object({
  name: z.string().optional()
});


export default class TestCrudService extends CrudService<{name: string}, {name?:string}>{
  constructor(model: MongoTesteModel){
    super(model, nameSchema, nameUpdateSchema)
  }
}