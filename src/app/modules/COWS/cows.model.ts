/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Schema, model } from 'mongoose';
import { CowsModel, ICow } from './cows.interface';
import { cowBreed, cowCategories, cowLabel, cowLocation } from './cows.const';


const CowSchema: Schema<ICow> = new Schema<ICow>(
  {
    name: { type: String, required: true,unique:true },

    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, enum: cowLocation, required: true },
    breed: { type: String, enum: cowBreed, required: true },
    weight: { type: Number, required: true },
    label: { type: String, enum: cowLabel, default: 'for sale' },
    category: {
      type: String,
      enum: cowCategories,
      required: true,
    },

    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cows = model<ICow, CowsModel>('Cow', CowSchema);
