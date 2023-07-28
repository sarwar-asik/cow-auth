/* eslint-disable @typescript-eslint/no-this-alias */

import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';
import bcrypt from 'bcrypt';

const AdminSchema: Schema<IAdmin> = new Schema<IAdmin>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

AdminSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user?.password, Number(10));
  user.role="admin"
  next();
})

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
