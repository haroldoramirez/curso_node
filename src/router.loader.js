import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Criar rotas de forma automatica
export const routerLoader = (app) => {
  const caminhoModulos = path.join(__dirname, 'modules');

  //Percorre para verificar todas as pastas dentro do modules
  fs.readdirSync(caminhoModulos).forEach(async (diretorio) => {
    const modulo = path.join(caminhoModulos, diretorio);

    if (fs.statSync(caminhoModulos).isDirectory()) {
      const caminhoController = path.join(modulo, `${diretorio}.controller.js`);

      console.log('caminhoController', caminhoController);

      if (fs.existsSync(caminhoController)) {
        const controller = await import(caminhoController);

        if (controller.default && typeof controller.default === 'function') {
          app.use(controller.default);
        }
      }
    }
  });
};
