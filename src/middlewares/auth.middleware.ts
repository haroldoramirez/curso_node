import { ReturnError } from '@exceptions/dtos/return-error-dto';
import { verifyToken } from '@utils/auth';
import { NextFunction, Request, Response } from 'express';

//Sera executada antes de uma requisicao
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authorization = req.headers.authorization;

  await verifyToken(authorization)
    .then(() => {
      next();
    })
    .catch((error) => {
      new ReturnError(res, error);
    });
};
