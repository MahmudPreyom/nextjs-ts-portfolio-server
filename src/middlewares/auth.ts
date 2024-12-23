import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../app/config';
import { User } from '../modules/user/user.model';
import AppError from '../app/errors/AppError';
import { StatusCodes } from 'http-status-codes';

const auth = (...requiredRole: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not Authorized!');
    }

    // if (!token || !token.startsWith('Bearer')) {
    //   throw new AppError(StatusCodes.UNAUTHORIZED, 'Access token is missing');
    // }

    // const splitToken = token.split(' ')[1];

    // console.log(splitToken);

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;

    // req.user = { id, email, role };

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }

    const isBlocked = user?.isBlocked;

    if (isBlocked === true) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked !!');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(StatusCodes.FORBIDDEN, 'You are not authorized');
    }
    req.user = decoded as JwtPayload;

    // console.log(req.user);

    next();
  });
};

export default auth;
