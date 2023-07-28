import express from 'express';

import validateRequest from '../../middlesWare/validateUserRequest';
import { CowController } from './cows.controller';
import { CowValidation } from './cows.validation';
import auth from '../../middlesWare/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  validateRequest(CowValidation.createCowZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.createCow
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  CowController.getSingleCow
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  CowController.getALLCow
);

router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);
router.patch(
  '/:id',
  validateRequest(CowValidation.updateCowZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.updateCow
);

export const CowsRouter = router;
