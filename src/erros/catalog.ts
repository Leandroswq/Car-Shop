export enum ErrorTypes{
  InvalidMongoId = 'InvalidMongoId',
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
};