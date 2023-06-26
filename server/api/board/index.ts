import type { ReturnItems } from '$/useCase/boardUseCase';

export type Methods = {
  get: {
    resBody: ReturnItems;
  };
  post: {
    reqBody: { x: number; y: number };
    resBody: ReturnItems;
  };
};
