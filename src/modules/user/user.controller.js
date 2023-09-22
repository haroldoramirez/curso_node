import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

//Inicio da rota depois do user - tipo o index
router.get('/', async function (req, res) {
  const prisma = new PrismaClient();

  const usersList = await prisma.user.findMany();

  res.send(usersList);
});

router.get('/:nome/sobrenome/:sobrenome', function (req, res) {
  res.send({
    nome: req.params.nome,
    sobrenome: req.params.sobrenome,
  });
});

export default userRouter;
