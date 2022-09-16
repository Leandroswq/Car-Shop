export enum ErrorTypes{
  InvalidMongoId = 'InvalidMongoId',
  ObjectNotFound = 'ObjectNotFound',
  BodyEmpty = 'BodyEmpty',
}

type ErrorResponseObject = {
  message: string;
  httpStatus:number
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

export const errorCatalog: ErrorCatalog = {
  InvalidMongoId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  
  BodyEmpty: {
    message: 'request body cannot be empty',
    httpStatus: 400,
  },
  
  ObjectNotFound: {
    message: 'Object not found',
    httpStatus: 404,
  },
};