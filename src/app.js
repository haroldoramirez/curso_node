import express from 'express';
import { routerLoader } from './router.loader.js';

const PORT = 8080;

const app = express();

routerLoader(app);

app.listen(PORT, function () {
  console.log('Servidor rodando na porta: ', PORT);
});
