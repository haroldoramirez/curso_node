import { UnauthorizedException } from '@exceptions/unauthorized-exception';
import { UserAuthDTO } from '@modules/auth/dtos/user.auth.dto';
import { UserModel } from '@modules/user/user.module';
import { sign, verify } from 'jsonwebtoken';

export const PASSWORD_JWT = 'senhadepoismudar';

export const generateToken = (user: UserModel): string => {
  return sign(
    {
      userId: user.id, // 1 - Payload
      email: user.email,
      tipo: user.typeUser,
    } as UserAuthDTO,
    PASSWORD_JWT, // 2 - Password Token variavel de ambiente
    {
      subject: String(user.id), // 3 Subject
      expiresIn: '604800000',
    },
  );
};

export const verifyToken = async (authorization?: string): Promise<UserAuthDTO> => {
  if (!authorization) {
    throw new UnauthorizedException();
  }

  const [, token] = authorization.split(' ');

  try {
    const decodedToken = <UserAuthDTO>verify(token, PASSWORD_JWT);

    return decodedToken;
  } catch (error) {
    throw new UnauthorizedException();
  }
};
