import { Router } from 'express';

import EntityController from './app/controllers/Entity/EntityController';
import AuthController from './app/controllers/Entity/AuthController';
import DonatorController from './app/controllers/Donator/DonatorController';

import EntityStore from './app/validators/Entity/EntityStore';
import EntityAuth from './app/validators/Entity/EntityAuth';

const routes = new Router();

routes.post('/entities', EntityStore, EntityController.store);
routes.post('/donators', DonatorController.store);

routes.post('/entities/auth', EntityAuth, AuthController.store);

export default routes;
