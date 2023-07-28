/* eslint-disable no-console */
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponce';
import { AdminServices } from './admin.services';
import { Request, Response } from 'express';
import { IAdmin } from './admin.interface';


const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const adminData = req.body;
  const result = await AdminServices.createAdminServices(adminData);

  if (result) {
    sendResponse<Partial<IAdmin>>(res, {
      success: true,
      message: 'successfully created Admin',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  }
});

export const adminController = { createAdmin };
