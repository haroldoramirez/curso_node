import { Router } from 'express';

export const productRouter = Router();

const router = Router();

productRouter.use('/product', router);

//Inicio da rota depois do user
router.get('/', function (req, res) {
  res.send('Hello world PRODUCT');
});
