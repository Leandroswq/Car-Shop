export interface IServiceCreate<T>{
  create(obj: T): Promise<T>,
}

export interface IServiceRead<T>{
  read(): Promise<T[]>
}

export interface IServiceReadOne<T>{
  readOne(_id:string): Promise<T>
}

export interface IServiceUpdate<T>{
  update(_id: string, obj: T): Promise<T>
}

export interface IServiceDelete{
  delete(_id: string): void
}

export interface IServiceCrud<T> extends IServiceCreate<T>, IServiceRead<T>,
  IServiceReadOne<T>, IServiceUpdate<T>, IServiceDelete{
  
}
