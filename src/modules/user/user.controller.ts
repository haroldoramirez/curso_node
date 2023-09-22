import { Router } from 'express';
import { createUser, getUsers } from './user.service';

const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

//Inicio da rota depois do user - tipo o index
router.get('/', async (req, res) => {
  const usersList = await getUsers();
  res.send(usersList);
});

router.get('/:nome/sobrenome/:sobrenome', function (req, res) {
  res.send({
    nome: req.params.nome,
    sobrenome: req.params.sobrenome,
  });
});

router.post('/', async (req, res) => {
  const user = await createUser(req.body);

  res.send(user);
});

export default userRouter;
