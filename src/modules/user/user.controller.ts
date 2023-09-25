import { Request, Response, Router } from 'express';
import { createUser, getUsers } from './user.service';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { NotFoundException } from '@exceptions/not-found-exception';

const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

//Inicio da rota depois do user - tipo o index
router.get('/', async (_, res: Response): Promise<void> => {
  const usersList = await getUsers().catch((error) => {

    if (error instanceof NotFoundException) {
      res.status(204);
    } else {
      res.status(500).send(error.message);
    }

  });
  res.send(usersList);
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
    const user = await createUser(req.body);
    res.send(user);
  },
);

export default userRouter;
