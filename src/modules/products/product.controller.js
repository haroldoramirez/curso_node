import { Router } from 'express';

export const productRouter = Router();

const router = Router();

//Inicio da rota depois do products
productRouter.use('/product', router);

//Inicio da rota depois do user - tipo o index
router.get('/', function (req, res) {
  res.send('Hello world PRODUCT');
});
