import { Model } from "mongoose";

export type IAdmin= {
    phoneNumber: string;
    role: 'admin'
    password: string;
    name: {
      firstName: string;
      lastName: string;
    };
    address: string;
  }

export type AdminModel =Model<IAdmin,Record<string,unknown>>