import express from 'express';
import { UserRouter } from '../modules/users/user.route';
import { CowsRouter } from '../modules/COWS/cows.route';

import { OrderRouter } from '../modules/ORDER/order.route';
import { AdminRouter } from '../modules/ADMIN/admin.route';
import { AuthRouter } from '../modules/AUTH/auth.route';

const router = express.Router();

const modulesRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/cows',
    route: CowsRouter,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/orders',
    route: OrderRouter,
  },
  {
    path: '/admins',
    route: AdminRouter,
  }
];

modulesRoutes.forEach(route => router.use(route.path, route.route));

export default router;
