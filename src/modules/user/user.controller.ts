import { Request, Response, Router } from 'express';
import { createUser, getUsers } from './user.service';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { NotFoundException } from '@exceptions/not-found-exception';
import { ReturnError } from '@exceptions/dtos/return-error-dto';
import { verifyToken } from '@utils/auth';

const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

//Inicio da rota depois do user - tipo o index
router.get('/', async (req: Request, res: Response): Promise<void> => {

  const authorization = req.headers.authorization;

  verifyToken(authorization).catch((error) => {
    new ReturnError(res, error);
  });

  const listaUsuarios = await getUsers().catch((error) => {
    if (error instanceof NotFoundException) {
      res.status(204);
    } else {
      new ReturnError(res, error);
    }
  });
  res.send(listaUsuarios);
});

router.get('/:nome/sobrenome/:sobrenome', async (req: Request, res: Response): Promise<void> => {
  res.send({
    nome: req.params.nome,
    sobrenome: req.params.sobrenome,
  });
});

router.post(
  '/',
  async (req: Request<undefined, undefined, UserInsertDTO>, res: Response): Promise<void> => {
    const usuario = await createUser(req.body).catch((error) => {
      new ReturnError(res, error);
    });
    res.send(usuario);
  },
);

export default userRouter;
