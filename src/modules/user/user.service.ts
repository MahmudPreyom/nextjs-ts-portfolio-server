import { StatusCodes } from 'http-status-codes';
import { BlogModel } from '../blog/blog.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../app/errors/AppError';

const createUserIntoDB = async (payload: TUser): Promise<TUser> => {
  payload.role = 'admin';
  const result = await User.create(payload);

  return result;
};

const getUser = async () => {
  const result = await User.find();
  return result;
};

const deleteBlogFromDBByAdmin = async (id: string, userRole: string) => {
  const deleteBlogId = await BlogModel.findById(id);
  console.log(deleteBlogId);

  if (!deleteBlogId) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (userRole !== 'admin') {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to delete this blog',
    );
  }

  const result = await BlogModel.findByIdAndDelete(id);
  return result;
};

export const userService = {
  createUserIntoDB,
  getUser,
  deleteBlogFromDBByAdmin,
};
