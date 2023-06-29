import type { ReturnItems } from '$/useCase/core';

export type Methods = {
  get: {
    resBody: ReturnItems;
  };
  post: {
    reqBody: { x: number; y: number };
    resBody: ReturnItems;
  };
  delete: {
    status: 204;
  };
};
