import { AppException } from './app-exception';

export class InternalServerErrorException extends AppException {
  constructor() {
    super('Erro interno de sistema', 500);
  }
}
