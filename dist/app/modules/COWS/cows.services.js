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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowService = void 0;
const cows_model_1 = require("./cows.model");
const createCow = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cows_model_1.Cows.create(payload);
    return result;
});
const getSingleCows = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cows_model_1.Cows.findById(id).populate('seller');
    return result;
});
const deleteCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cows_model_1.Cows.findByIdAndDelete(id).populate('seller');
    return result;
});
const updateCow = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cows_model_1.Cows.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate('seller');
    return result;
});
//   pagination getAllCOw
const getALLCow = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const page = Number(paginationOptions.page || 1);
    const limit = Number(paginationOptions.limit || 10);
    const skip = (page - 1) * limit;
    const sortBy = paginationOptions.sortBy || 'createdAt';
    const sortOrder = paginationOptions.sortOrder || 'desc';
    const CowSearchableFields = ['minPrice', 'maxPrice', 'location'];
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: CowSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // if (Object.keys(filtersData).length) {
    //   andConditions.push({
    //     $and: Object.entries(filtersData).map(([field, value]) => ({
    //       [field]: value,
    //     })),
    //   });
    // }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => {
                const fieldName = field === 'minPrice' || field === 'maxPrice' ? 'price' : field;
                const NewValue = field === 'minPrice' || field === 'maxPrice'
                    ? parseInt(value)
                    : value;
                if (field === 'minPrice') {
                    return { [fieldName]: { $gt: NewValue } };
                }
                if (field === 'maxPrice') {
                    return { [fieldName]: { $lt: NewValue } };
                }
                return { [fieldName]: value };
            }),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield cows_model_1.Cows.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit)
        .populate('seller');
    // .select({ price: 1, name: 1 });
    const total = yield cows_model_1.Cows.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.CowService = {
    createCow,
    getSingleCows,
    deleteCow,
    updateCow,
    getALLCow,
};
