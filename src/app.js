import express from 'express';
import { routerLoader } from './router.loader.js';

const PORT = 8080;

const app = express();

//Fazer a conversao do body em requests json
app.use(express.json());

routerLoader(app);

app.listen(PORT, function () {
  console.log('Servidor rodando na porta: ', PORT);
});
