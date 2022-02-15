/**
 * Os Cotrollers servem diretamente às rotas e usam os
 * Services para armazenar os dados. São responsáveis
 * por validar o input e retornar erros de validação
 * ou o resultado das operações bem sucedidas no DB.
 */
import * as homeController from './home.controller';
import * as ordersController from './orders.controller';

export {
  homeController,
  ordersController
};
