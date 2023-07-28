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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminServices = void 0;
const admin_model_1 = require("./admin.model");
const user_model_1 = require("../users/user.model");
const createAdminServices = (admin) => __awaiter(void 0, void 0, void 0, function* () {
    let returnData = null;
    console.log(admin);
    const createUser = yield user_model_1.User.create(admin);
    if (createUser) {
        const createAdmin = yield admin_model_1.Admin.create(admin);
        if (createAdmin) {
            // console.log('sssssssss', createAdmin, 'aaaaaaaaa');
            const data = {
                _id: createAdmin._id,
                role: createAdmin === null || createAdmin === void 0 ? void 0 : createAdmin.role,
                name: createAdmin === null || createAdmin === void 0 ? void 0 : createAdmin.name,
                phoneNumber: createAdmin === null || createAdmin === void 0 ? void 0 : createAdmin.phoneNumber,
                address: createAdmin === null || createAdmin === void 0 ? void 0 : createAdmin.address,
            };
            returnData = data;
        }
    }
    return returnData;
});
// const createAdminServices = async (admin : Partial<IAdmin>) => {
//   let session;
//   let returnData = null;
//   try {
//     session = await mongoose.startSession();
//     session.startTransaction();
//     const createUser = await User.create(admin, { session });
//     if (createUser) {
//       const createAdmin = await Admin.create(admin, { session });
//       if (createAdmin) {
//         const { password, ...data } = createAdmin;
//         console.log(password, data, "from services");
//         returnData = data;
//       }
//     }
//     await session.commitTransaction();
//   } catch (error) {
//     console.log(error, "error from user-service");
//     await session?.abortTransaction();
//     throw error;
//   } finally {
//     session?.endSession();
//   }
//   return returnData;
// };
exports.AdminServices = { createAdminServices };
