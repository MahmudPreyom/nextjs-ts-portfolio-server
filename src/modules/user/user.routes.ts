import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { userControllers } from './user.controller';
import { USER_ROLE } from './user.const';
import auth from '../../middlewares/auth';

const userRoutes = Router();
userRoutes.post(
  '/create-admin',
  validateRequest(UserValidation.userValidationSchema),
  userControllers.createUser,
);

userRoutes.delete(
  '/:id',
  auth('admin'),
  // validateRequest(UserValidation.userValidationSchema),
  userControllers.deleteBlog,
);

userRoutes.patch(
  '/:id/block',
  auth('admin'),
  validateRequest(UserValidation.updateUserValidationSchema),
  userControllers.updateUserBlockStatus,
);

userRoutes.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  userControllers.getUser,
);

export default userRoutes;
