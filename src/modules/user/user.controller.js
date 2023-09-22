import { Router } from 'express';

const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

//Inicio da rota depois do user - tipo o index
router.get('/', function (req, res) {
  res.send('Hello world USER');
});

router.get('/:nome/sobrenome/:sobrenome', function (req, res) {
  res.send({
    nome: req.params.nome,
    sobrenome: req.params.sobrenome,
  });
});

export default userRouter;
