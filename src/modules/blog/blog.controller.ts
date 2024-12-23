/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { blogServices } from './blog.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';

const createBlog = catchAsync(async (req, res) => {
  // const { result, authorData } = await blogServices.createBlogIntoDB(req.body);
  // const userId = req.user?._id;
  // const { title, content } = req.body;

  // const blog = await blogServices.createBlogIntoDB({
  //   title,
  //   content,
  //   // author: userId,
  //   isPublished: false,
  // });
  const author = req.user?._id;
  // console.log(author);

  if (!author) {
    throw new Error('User not authenticated');
  }

  const blogData = {
    ...req.body,
    author: author,
  };

  const result = await blogServices.createBlogIntoDB(blogData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog is created successfully',
    data: result,
    // data: {
    //   _id: result._id,
    //   title: result.title,
    //   content: result?.content,
    //   authorData,
    // },
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogServices.getAllBlogsFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blogs are retrieved successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await blogServices.updateBlogInDB(id, req.body);
  // const blogId = req.params.id;
  const userId = req.user?._id;
  console.log(userId);

  if (result?.author.toString() !== userId.toString()) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'You are not authorized');
  }
  // console.log(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
    // data: {
    //   _id: result?._id,
    //   title: result?.title,
    //   content: result?.content,
    //   author: author,
    // },
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await blogServices.deleteBlogFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});

export const blogController = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
