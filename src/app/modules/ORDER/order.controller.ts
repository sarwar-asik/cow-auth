/* eslint-disable no-console */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { OrderService } from './order.services';
import sendResponse from '../../../shared/sendResponce';
import { IOrder } from './order.interface';
import { Orders } from './order.model';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import httpStatus from 'http-status';
import { Cows } from '../COWS/cows.model';
import ApiError from '../../../errors/ApiError';

export const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...OrderData } = req.body;
  const result = await OrderService.createOrder(OrderData);

  sendResponse<IOrder>(res, {
    statusCode: 200,
    success: true,
    message: 'Order created successfully!',
    data: result,
  })
})

export const getALLOrder = catchAsync(async (req: Request, res: Response) => {
  // const id = req.params.id;

  const token = req.headers.authorization;

  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, `You are not authorized`);
  }

  const verifiedUser = jwtHelpers.verifyToken(
    token as string,
    config.jwt.secret as Secret
  );
  console.log(verifiedUser);

  let data = null;
  // let query ={}
  if (verifiedUser?.role === 'admin') {
    data = await Orders.find({});
  }

  if (verifiedUser?.role === 'buyer') {

    data = await Orders.find({ buyer: verifiedUser?._id})
      .populate('buyer')
      .populate('seller');
  }
  if (verifiedUser?.role === 'seller') {
    const CowsData = await Cows.findOne({ seller: verifiedUser?._id });
    if (CowsData) {
      data = await Orders.find({ cow: CowsData?._id })
        .populate('buyer')
        .populate('seller');
    }
  }
  sendResponse(res, {
    success: true,
    message: 'successfully fetched Order',
    statusCode: httpStatus.FOUND,
    data: data,
  });
});

export const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const token = req.headers.authorization;

  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, `You are not authorized`);
  }

  const verifiedUser = jwtHelpers.verifyToken(
    token as string,
    config.jwt.secret as Secret
  );
  console.log(verifiedUser);

  let data = null;
  // let query ={}
  if (verifiedUser?.role === 'admin') {
    data = await Orders.find({});
  }

  if (verifiedUser?.role === 'buyer') {
    console.log(id, 'params id');
    data = await Orders.find({ buyer: verifiedUser?._id, _id: id })
      .populate('buyer')
      .populate('seller');
  }
  if (verifiedUser?.role === 'seller') {
    const CowsData = await Cows.findOne({ seller: verifiedUser?._id });
    if (CowsData) {
      data = await Orders.find({ _id: id, cow: CowsData?._id })
        .populate('buyer')
        .populate('seller');
    }
  }
  sendResponse(res, {
    success: true,
    message: 'successfully fetched Orders',
    statusCode: httpStatus.FOUND,
    data: data,
  });
});
