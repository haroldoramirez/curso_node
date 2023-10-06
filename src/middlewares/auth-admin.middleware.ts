import { ReturnError } from '@exceptions/dtos/return-error-dto';
import { UnauthorizedException } from '@exceptions/unauthorized-exception';
import { UserAuthDTO } from '@modules/auth/dtos/user.auth.dto';
import { verifyToken } from '@utils/auth';
import { NextFunction, Request, Response } from 'express';
import { UserTypeEnum } from 'src/enums/user-type.enum';

//Sera executada antes de uma requisicao
export const authAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authorization = req.headers.authorization;

  await verifyToken(authorization)
    .then((user: UserAuthDTO) => {

        if (user.typeUser !== UserTypeEnum.ADMIN) {
            new ReturnError(res, new UnauthorizedException())
        } else {
            next();
        }

    })
    .catch((error) => {
      new ReturnError(res, error);
    });

};
