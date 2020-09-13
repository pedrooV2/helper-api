import { Router } from 'express';

// Multer
import multer from 'multer';
import multerConfig from './config/multer';

// Controllers
import EntityController from './app/controllers/Entity/EntityController';
import EntityAuthController from './app/controllers/Entity/AuthController';
import ProfileController from './app/controllers/Entity/ProfileController';
import DonatorController from './app/controllers/Donator/DonatorController';
import DonatorAuthController from './app/controllers/Donator/AuthController';
import AvatarController from './app/controllers/AvatarController';
import CaseController from './app/controllers/CaseController';
import FileController from './app/controllers/FileController';

//  Middlewares
import authEntity from './app/middlewares/authEntity';

// Validators
import EntityStore from './app/validators/Entity/EntityStore';
import EntityAuth from './app/validators/Entity/EntityAuth';
import DonatorStore from './app/validators/Donator/DonatorStore';
import CaseStore from './app/validators/Cases/CaseStore';

const routes = new Router();
const upload = multer(multerConfig);

// Routes
// Donators
routes.post('/donators', DonatorStore, DonatorController.store);
routes.post('/donators/auth', DonatorAuthController.store);

// Entities
routes.post('/entities', EntityStore, EntityController.store);
routes.post('/entities/auth', EntityAuth, EntityAuthController.store);
routes.post('/entities/profiles', ProfileController.store);

routes.use(authEntity);
routes.post('/cases', CaseStore, CaseController.store);
routes.post(
  '/cases/:id/files',
  authEntity,
  upload.single('file'),
  FileController.store
);

// Upload files
routes.post('/avatars', upload.single('avatar'), AvatarController.store);
export default routes;
