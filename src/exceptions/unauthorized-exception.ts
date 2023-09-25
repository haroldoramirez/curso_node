import { AppException } from './app-exception';

export class UnauthorizedException extends AppException {
  constructor() {
    super('Usuário sem permissão', 401);
  }
}
