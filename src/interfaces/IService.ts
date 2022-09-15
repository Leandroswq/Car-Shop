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

export interface IServiceDelete<T>{
  delete(_id: string, obj: T): void
}

export interface IServiceCrud<T> extends IServiceCreate<T>, IServiceRead<T>,
  IServiceReadOne<T>, IServiceUpdate<T>, IServiceDelete<T>{
  
}
