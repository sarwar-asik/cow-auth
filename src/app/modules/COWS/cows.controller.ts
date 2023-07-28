/* eslint-disable no-console */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponce';
import { ICow } from './cows.interface';
import { CowService } from './cows.services';
import pick from '../../../shared/pick';
const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...CowData } = req.body;
  const result = await CowService.createCow(CowData)
  sendResponse<ICow>(res, {
    statusCode: 200,
    success: true,
    message: 'Cow created successfully!',
    data: result,
  })
});


  const getSingleCow = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
  
    const result = await CowService.getSingleCows(id)
    console.log(id,"id");
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Cow retrieved successfully !',
      data: result,
    });
  });
  
  const deleteCow = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
  
    const result = await CowService.deleteCow(id);
  
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Cow deleted successfully !',
      data: result,
    });
  });
  
  
  const updateCow = catchAsync(
    catchAsync(async (req: Request, res: Response) => {
      const { id } = req.params;
      const updatedData = req.body;
      const result = await  CowService.updateCow (id, updatedData);
  
      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Cow updated successfully',
        data: result,
      });
    })
  );


//   with pagination ///
const cowFilterableFields = ['searchTerm', 'minPrice','maxPrice','location'];
const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder'];

const getALLCow = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, cowFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
  
    const result = await CowService.getALLCow(
      filters,
      paginationOptions
    );
  
   res.status(200).json({
    success:true,
    statusCode:200,
    message:"Cows retrieved successfully ",
    meta:result.meta,
    data:result.data
   })
  });

export const CowController = { createCow ,getALLCow,updateCow,getSingleCow,deleteCow};
