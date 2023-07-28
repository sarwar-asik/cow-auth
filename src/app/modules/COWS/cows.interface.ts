import { Model, Types } from 'mongoose';
import { IUser } from '../users/user.interface';


export type Location =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh';
type Breed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';
type Label = 'for sale' | 'sold out';
type Category = 'Dairy' | 'Beef' | 'Dual Purpose';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: Location;
  breed: Breed;
  weight: number;
  label: Label;
  category: Category;
  seller: Types.ObjectId | IUser;
};

export type CowsModel = Model<ICow, Record<string, unknown>>;
