import express from 'express';
import {
  createOrder,
  getALLOrder,
  getSingleOrder,
} from './order.controller';
import auth from '../../middlesWare/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { OrderValidation } from './orders.validation';
import validateRequest from '../../middlesWare/validateUserRequest';
import authOrder from './order.auth';


const router = express.Router();

router.post(
  '/',
  validateRequest(OrderValidation.createOrderZodSchema),
  auth(ENUM_USER_ROLE.BUYER),
  createOrder
);


// created  a new middleWare for get Specify order 

router.get(
  '/:id',
  authOrder(ENUM_USER_ROLE.ADMIN),
  getSingleOrder
);

router.get(
  '/',
  authOrder(ENUM_USER_ROLE.ADMIN),
  getALLOrder
);




export const OrderRouter = router;
