import { SortOrder } from 'mongoose';
import { IGenericCowResponse } from '../../../interfaces/ICommon';
import { ICow, Location } from './cows.interface';
import { Cows } from './cows.model';

const createCow = async (payload: ICow): Promise<ICow> => {
  const result = await Cows.create(payload);
  return result;
};

const getSingleCows = async (id: string): Promise<ICow | null> => {
  const result = await Cows.findById(id).populate('seller');

  return result;
};

const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cows.findByIdAndDelete(id).populate('seller');

  return result;
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const result = await Cows.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('seller');
  return result;
};

// pagination ./////

type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

type ICowFilters = {
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: Location;
};

//   pagination getAllCOw

const getALLCow = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericCowResponse<Partial<ICow[]>>> => {
  const { searchTerm, ...filtersData } = filters;

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
        const fieldName =
          field === 'minPrice' || field === 'maxPrice' ? 'price' : field;
        const NewValue =
          field === 'minPrice' || field === 'maxPrice'
            ? parseInt(value as string)
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

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cows.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('seller')

  // .select({ price: 1, name: 1 });

  const total = await Cows.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const CowService = {
  createCow,
  getSingleCows,
  deleteCow,
  updateCow,
  getALLCow,
};
