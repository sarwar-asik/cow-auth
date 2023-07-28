/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

const OrderSchemas: Schema<IOrder> = new Schema<IOrder>(
  {
    cow: { type: Schema.Types.ObjectId, ref: 'COw', required: true },

    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User'}
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Orders = model<IOrder, OrderModel>('Order', OrderSchemas);
