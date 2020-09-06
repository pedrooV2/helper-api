import { Router } from 'express';

// Multer
import multer from 'multer';
import multerConfig from './config/multer';

// Controllers
import EntityController from './app/controllers/Entity/EntityController';
import AuthController from './app/controllers/Entity/AuthController';
import DonatorController from './app/controllers/Donator/DonatorController';
import AvatarController from './app/controllers/AvatarController';

// Validators
import EntityStore from './app/validators/Entity/EntityStore';
import EntityAuth from './app/validators/Entity/EntityAuth';
import DonatorStore from './app/validators/Donator/DonatorStore';

const routes = new Router();
const upload = multer(multerConfig);

// Routes
// Donators
routes.post('/donators', DonatorStore, DonatorController.store);

// Entities
routes.post('/entities', EntityStore, EntityController.store);
routes.post('/entities/auth', EntityAuth, AuthController.store);

// Upload files
routes.post('/avatars', upload.single('file'), AvatarController.store);
export default routes;
