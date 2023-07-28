/* eslint-disable no-console */

import mongoose from 'mongoose';
import { Cows } from '../COWS/cows.model';
import { User } from '../users/user.model';
import { IOrder } from './order.interface';
import { Orders } from './order.model';
import ApiError from '../../../errors/ApiError';

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  //   console.log(payload, 'from order ');
  const { cow, buyer } = payload;
  

    // Check if the user has enough money in their account to buy the cow
    const buyerData :any = await User.findOne({ _id: buyer });
    const cowData:any = await Cows.findOne({ _id: cow });
    payload.seller = cowData.seller
    // console.log(cowData, 'cow and ', buyerData);

    if (!cowData) {
      new ApiError(400, 'Could not find the Cow');
    } else if (!buyerData) {
      new ApiError(400, 'Could not find the Buyer');
    }

    const cowPrice = cowData.price ;
    const buyerBudget = buyerData.budget;

    if (cowPrice > buyerBudget) {
      new ApiError(400, 'Failed to create new User');
    }

    const sessionMongoose = await mongoose.startSession();
    sessionMongoose.startTransaction();

    try {
      await Cows.updateOne(
        { _id: cow },
        { label: 'sold out' },
        { sessionMongoose }
      );

      await User.updateOne(
        { _id: buyer },
        { $inc: { budget: -cowPrice } },
        { sessionMongoose }
      );

      await User.updateOne(
        { _id: buyer },
        { $inc: { income: cowPrice } },
        { sessionMongoose }
      );

      const order = await Orders.create(payload);

      await sessionMongoose.commitTransaction();

      return order;
    } catch (error) {
      await sessionMongoose.abortTransaction();
      throw error;
    } finally {
      sessionMongoose.endSession();
    }

//   const result = await Orders.create(payload);
//   return result;
};



const getSingleOrder = async (id: string): Promise<{cow:IOrder} | {cow:null} > => {
  const result = await Orders.findById(id);
  return {
    cow:result
  }
};

export const OrderService = {
  createOrder,
  getSingleOrder
};
