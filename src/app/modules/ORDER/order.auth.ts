
import { NextFunction, Request, Response } from 'express';

import httpStatus from 'http-status';

import { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';

const authOrder =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      
        if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, `You are not authorized`);
      }
    // verify token
    let verifiedUser = null;
    
      verifiedUser = jwtHelpers.verifyToken(token as string, config.jwt.secret as Secret);
      
    //   console.log('requiredRole ', requiredRoles, 'tokenData ===', verifiedUser);

    //   if (verifiedUser.role !== "admin") {
    //     throw new ApiError(httpStatus.UNAUTHORIZED, `You are not authorized`);
    //   }
      // eslint-disable-next-line no-console
      //   console.log(verifiedUser,"verifiedUser");

      req.user = verifiedUser; // role ,

        // if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        //   throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden. You are not valid user');
        // }
        
      next();
    } catch (error) {
      next(error);
    }
  };

export default authOrder;
