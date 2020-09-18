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
import PhoneController from './app/controllers/PhoneCotroller';
import DonationController from './app/controllers/DonationController';

//  Middlewares
import authMiddleware from './app/middlewares/auth';
import isEntityMiddleware from './app/middlewares/entity';
import isDonatorMiddleware from './app/middlewares/donator';

// Validators
import EntityStore from './app/validators/Entity/EntityStore';
import EntityAuth from './app/validators/Entity/EntityAuth';
import ProfileStore from './app/validators/Entity/ProfileStore';
import DonatorStore from './app/validators/Donator/DonatorStore';
import CaseStore from './app/validators/Cases/CaseStore';
import PhoneStore from './app/validators/Phone/PhoneStore';

const routes = new Router();
const upload = multer(multerConfig);

// Routes
// Donators
routes.post('/donators', DonatorStore, DonatorController.store);
routes.post('/donators/auth', DonatorAuthController.store);

// Entities
routes.post('/entities', EntityStore, EntityController.store);
routes.post('/entities/auth', EntityAuth, EntityAuthController.store);
routes.post('/entities/profiles', ProfileStore, ProfileController.store);

// Private routes
routes.use(authMiddleware);
routes.post(
  '/entities/phones',
  isEntityMiddleware,
  PhoneStore,
  PhoneController.store
);
routes.post('/cases', isEntityMiddleware, CaseStore, CaseController.store);
routes.post('/cases/:id/files', upload.single('file'), FileController.store);

routes.post(
  '/cases/:id/donations',
  isDonatorMiddleware,
  DonationController.store
);

// Upload files
routes.post('/avatars', upload.single('avatar'), AvatarController.store);
export default routes;
