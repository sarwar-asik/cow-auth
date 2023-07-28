import express from 'express';

import validateRequest from '../../middlesWare/validateUserRequest';

import auth from '../../middlesWare/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { userController } from '../users/user.controller';
import { UserValidation } from '../users/user.validation';

const router = express.Router();

// it is optional

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  userController.getSingleUser
);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), userController.getALLUser);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), userController.deleteUser);
router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  userController.updateUser
);

export const UserRouter = router;
