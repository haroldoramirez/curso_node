import { AppException } from './app-exception';

export class NotFoundException extends AppException {
  constructor(entity: string) {
    super(`${entity} não encontrado`, 404);
  }
}
