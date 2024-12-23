/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import config from '../../app/config';
import AppError from '../../app/errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );
  // console.log(user);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  const isBlocked = user?.isBlocked;

  if (isBlocked === true) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked !');
  }

  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new Error('Password can not match!');
  }

  // jwt.sign({ email: user?.email }, 'secret', { expiresIn: '30d' });

  const token = jwt.sign(
    // { email: user?.email, role: user?.role, id: user?._id },
    { _id: user._id, email: user.email, role: user.role },
    config.jwt_access_secret as string,
    { expiresIn: '40d' },
  );

  // const verifiedUser = {
  //   name: user?.name,
  //   email: user?.email,
  //   id: user?._id,
  //   role: user?.role,
  // };

  // eslint-disable-next-line no-unused-vars
  const { password, ...remainingData } = user;

  // console.log(verifiedUser);

  return { token, remainingData };
};

export const AuthServices = {
  register,
  login,
};
