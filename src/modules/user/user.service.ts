import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser): Promise<TUser> => {
  payload.role = 'admin';
  const result = await User.create(payload);

  return result;
};

const getUser = async () => {
  const result = await User.find();
  return result;
};

export const userService = {
  createUserIntoDB,
  getUser,
};
