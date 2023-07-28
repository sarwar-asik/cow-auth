"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
/* eslint-disable no-console */
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponce_1 = __importDefault(require("../../../shared/sendResponce"));
const admin_services_1 = require("./admin.services");
const createAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminData = req.body;
    const result = yield admin_services_1.AdminServices.createAdminServices(adminData);
    if (result) {
        (0, sendResponce_1.default)(res, {
            success: true,
            message: 'successfully created Admin',
            statusCode: http_status_1.default.CREATED,
            data: result,
        });
    }
}));
exports.adminController = { createAdmin };
