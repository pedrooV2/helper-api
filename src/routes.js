import { Router } from 'express';

import EntityController from './app/controllers/EntityController';

const routes = new Router();

routes.post('/entities', EntityController.store);

export default routes;
