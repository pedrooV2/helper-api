import { Router } from 'express';

// Multer
import multer from 'multer';
import multerConfig from './config/multer';

// Controllers
import EntityController from './app/controllers/Entity/EntityController';
import EntityAuthController from './app/controllers/Entity/AuthController';
import DonatorController from './app/controllers/Donator/DonatorController';
import DonatorAuthController from './app/controllers/Donator/AuthController';
import AvatarController from './app/controllers/AvatarController';
import CaseController from './app/controllers/CaseController';

//  Middlewares
import authEntity from './app/middlewares/authEntity';

// Validators
import EntityStore from './app/validators/Entity/EntityStore';
import EntityAuth from './app/validators/Entity/EntityAuth';
import DonatorStore from './app/validators/Donator/DonatorStore';

const routes = new Router();
const upload = multer(multerConfig);

// Routes
// Donators
routes.post('/donators', DonatorStore, DonatorController.store);
routes.post('/donators/auth', DonatorAuthController.store);

// Entities
routes.post('/entities', EntityStore, EntityController.store);
routes.post('/entities/auth', EntityAuth, EntityAuthController.store);

routes.use(authEntity);
routes.post('/cases', CaseController.store);

// Upload files
routes.post('/avatars', upload.single('avatar'), AvatarController.store);
export default routes;
