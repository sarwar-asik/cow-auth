/* eslint-disable no-console */
// import { IUser } from "../users/user.interface";
import { IAdmin } from './admin.interface';
import { Admin } from './admin.model';

import { User } from '../users/user.model';

const createAdminServices = async (
  admin: Partial<IAdmin> | null
): Promise<Partial<IAdmin> | null> => {
  let returnData = null;
  console.log(admin);
  const createUser = await User.create(admin);

  if (createUser) {
    const createAdmin = await Admin.create(admin);
    if (createAdmin) {
      // console.log('sssssssss', createAdmin, 'aaaaaaaaa');
      const data = {
        _id: createAdmin._id,
        role: createAdmin?.role,
        name: createAdmin?.name,
        phoneNumber: createAdmin?.phoneNumber,
        address: createAdmin?.address,
      };
      returnData = data;
    }
  }

  return returnData;
};

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

export const AdminServices = { createAdminServices };
