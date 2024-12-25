import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userService } from './user.service';
import { StatusCodes } from 'http-status-codes';

const createUser = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await userService.createUserIntoDB(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUser();

  // const user = req.user?._id;
  // console.log(user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users getting successfully',
    data: result,
  });
});

const updateUserBlockStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const result = await userService.updateUserBlockStatusIntoDb(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users blocked successfully',
    // data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userRole = req.user?.role;
  console.log(userRole);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const result = await userService.deleteBlogFromDBByAdmin(id, userRole);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully by admin',
  });
});

export const userControllers = {
  createUser,
  getUser,
  updateUserBlockStatus,
  deleteBlog,
};
