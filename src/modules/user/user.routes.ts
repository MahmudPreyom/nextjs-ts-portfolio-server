import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { userControllers } from './user.controller';
import { USER_ROLE } from './user.const';
import auth from '../../middlewares/auth';

const userRoutes = Router();
userRoutes.post(
  '/create-admin',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.userValidationSchema),
  userControllers.createUser,
);

userRoutes.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  userControllers.getUser,
);

export default userRoutes;
