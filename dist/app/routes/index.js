"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/users/user.route");
const cows_route_1 = require("../modules/COWS/cows.route");
const order_route_1 = require("../modules/ORDER/order.route");
const admin_route_1 = require("../modules/ADMIN/admin.route");
const auth_route_1 = require("../modules/AUTH/auth.route");
const router = express_1.default.Router();
const modulesRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRouter,
    },
    {
        path: '/cows',
        route: cows_route_1.CowsRouter,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRouter,
    },
    {
        path: '/orders',
        route: order_route_1.OrderRouter,
    },
    {
        path: '/admins',
        route: admin_route_1.AdminRouter,
    }
];
modulesRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
