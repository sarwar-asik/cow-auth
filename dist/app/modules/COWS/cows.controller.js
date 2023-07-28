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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponce_1 = __importDefault(require("../../../shared/sendResponce"));
const cows_services_1 = require("./cows.services");
const pick_1 = __importDefault(require("../../../shared/pick"));
const createCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const CowData = __rest(req.body, []);
    const result = yield cows_services_1.CowService.createCow(CowData);
    (0, sendResponce_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Cow created successfully!',
        data: result,
    });
}));
// const getALLCow = catchAsync(async (req: Request, res: Response) => {
//     const data = await Cows.find({});
//     sendResponse(res, {
//       success: true,
//       message: 'successfully create Users',
//       statusCode: 200,
//       data: data,
//     });
//   });
const getSingleCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cows_services_1.CowService.getSingleCows(id);
    console.log(id, "id");
    (0, sendResponce_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Cow retrieved successfully !',
        data: result,
    });
}));
const deleteCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cows_services_1.CowService.deleteCow(id);
    (0, sendResponce_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Cow deleted successfully !',
        data: result,
    });
}));
const updateCow = (0, catchAsync_1.default)((0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    const result = yield cows_services_1.CowService.updateCow(id, updatedData);
    (0, sendResponce_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Cow updated successfully',
        data: result,
    });
})));
//   with pagination ///
const cowFilterableFields = ['searchTerm', 'minPrice', 'maxPrice', 'location'];
const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder'];
const getALLCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, cowFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, paginationFields);
    const result = yield cows_services_1.CowService.getALLCow(filters, paginationOptions);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Cows retrieved successfully ",
        meta: result.meta,
        data: result.data
    });
}));
exports.CowController = { createCow, getALLCow, updateCow, getSingleCow, deleteCow };
