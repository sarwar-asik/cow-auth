import express from 'express';

import validateRequest from '../../middlesWare/validateUserRequest';
import { AdminValidation } from './admin.validation';

import { AuthValidation } from '../AUTH/auth.validation';
import { authController } from '../AUTH/auth.controller';
import { adminController } from './admin.controller';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminZodSchema),
  adminController.createAdmin
);

router.post(
  '/login',
  validateRequest(AuthValidation.createUserZodSchema),
  authController.loginController
  )

// router.get("/",userController.getUser)

export const AdminRouter = router;
