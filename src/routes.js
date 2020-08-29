import { Router } from 'express';

import EntityController from './app/controllers/Entity/EntityController';
import AuthController from './app/controllers/Entity/AuthController';

const routes = new Router();

routes.post('/entities', EntityController.store);

routes.post('/entities/auth', AuthController.store);

export default routes;
