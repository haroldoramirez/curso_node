import { Router } from 'express';

const productRouter = Router();

const router = Router();

productRouter.use('/product', router);

//Inicio da rota depois do user - tipo o index
router.get('/', function (req, res) {
  res.send('Hello world PRODUCT');
});

export default productRouter;
