import { Model, Types } from 'mongoose';
import { IUser } from '../users/user.interface';
import { ICow } from '../COWS/cows.interface';


export type IOrder = {
    cow:Types.ObjectId | ICow
    buyer: Types.ObjectId | IUser;
    seller?: Types.ObjectId | IUser;
};

export type OrderModel = Model<IOrder, Record<string, unknown>>;
