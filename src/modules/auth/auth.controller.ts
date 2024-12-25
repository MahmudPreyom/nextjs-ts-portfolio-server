import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { AuthServices } from './auth.service';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.register(req.body);
  // const {name ,email} = resultRegister

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'User registered successfully',
    data: { _id: result._id, name: result?.name, email: result?.email },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.ACCEPTED,
    success: true,
    message: 'User logged in successfully',
    data: { token: result?.token },
  });
});

export const AuthControllers = {
  register,
  login,
};
