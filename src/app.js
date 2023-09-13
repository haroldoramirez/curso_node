import express from 'express';
import { userRouter } from './modules/user/user.controller.js';
import { productRouter } from './modules/products/product.controller.js';

const PORT = 8080;

const app = express();

app.use(userRouter);
app.use(productRouter);

app.listen(PORT, function () {
  console.log('Servidor rodando na porta: ', PORT);
});
