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
import SocialMediaController from './app/controllers/SocialMediaController';
import DonationController from './app/controllers/DonationController';
import DashboardController from './app/controllers/Entity/DashboardController';

//  Middlewares
import authMiddleware from './app/middlewares/auth';
import isEntityMiddleware from './app/middlewares/entity';
import isDonatorMiddleware from './app/middlewares/donator';

// Validators
import validateEntityStore from './app/validators/Entity/EntityStore';
import validateEntityAuth from './app/validators/Entity/EntityAuth';
import validateProfileStore from './app/validators/Entity/ProfileStore';
import validateDonatorStore from './app/validators/Donator/DonatorStore';
import validateCaseStore from './app/validators/Cases/CaseStore';
import validatePhoneStore from './app/validators/Phone/PhoneStore';
import validateSocialMedia from './app/validators/SocialMedia/SocialMediaStore';
import validateDonationStore from './app/validators/Donation/DonationStore';
import validateAvatarStore from './app/validators/Avatar/AvatarStore';
import validateFileStore from './app/validators/File/FileStore';
import validateCaseShow from './app/validators/Cases/CaseShow';

const routes = new Router();
const upload = multer(multerConfig);

// Routes
// Donators
routes.post('/donators', validateDonatorStore, DonatorController.store);
routes.post('/donators/auth', DonatorAuthController.store);

// Entities
routes.post('/entities', validateEntityStore, EntityController.store);
routes.post('/entities/auth', validateEntityAuth, EntityAuthController.store);

// Private routes
routes.use(authMiddleware);

routes.post(
  '/entities/profiles',
  isEntityMiddleware,
  validateProfileStore,
  ProfileController.store
);

// Entity Dashboard
routes.get(
  '/entities/dashboard',
  isEntityMiddleware,
  DashboardController.index
);

// Phones
routes.post(
  '/entities/phones',
  isEntityMiddleware,
  validatePhoneStore,
  PhoneController.store
);

// Social Medias
routes.get(
  '/entities/socialmedias',
  isEntityMiddleware,
  SocialMediaController.index
);
routes.post(
  '/entities/socialmedias',
  isEntityMiddleware,
  validateSocialMedia,
  SocialMediaController.store
);

// Cases
routes.post(
  '/cases',
  isEntityMiddleware,
  validateCaseStore,
  CaseController.store
);
routes.get('/entities/cases', isEntityMiddleware, CaseController.index);
routes.get(
  '/entities/cases/:id',
  isEntityMiddleware,
  validateCaseShow,
  CaseController.show
);
routes.post(
  '/cases/:id/files',
  upload.single('file'),
  validateFileStore,
  FileController.store
);
routes.get('/donations', isEntityMiddleware, DonationController.index);
routes.post(
  '/cases/:id/donations',
  isDonatorMiddleware,
  validateDonationStore,
  DonationController.store
);

// Upload files
routes.post(
  '/avatars',
  upload.single('avatar'),
  validateAvatarStore,
  AvatarController.store
);
export default routes;
