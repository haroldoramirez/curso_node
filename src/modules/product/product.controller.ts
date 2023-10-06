import { Response, Router } from 'express';

const getProducts = (_, res: Response): void => {
  res.send('Hello world PRODUCT');
};

const productRouter = Router();

const router = Router();

productRouter.use('/product', router);

//Inicio da rota depois do user - tipo o index
router.get('/', getProducts);

export default productRouter;
