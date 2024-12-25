import QueryBuilder from '../../app/builder/QueryBuilder';
import AppError from '../../app/errors/AppError';
import { User } from '../user/user.model';
// import { User } from '../user/user.model';
import { BlogSearchableFields } from './blog.const';
import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';
import { StatusCodes } from 'http-status-codes';

const createBlogIntoDB = async (payload: TBlog, id: string) => {
  const userId = await User.findById(id);
  if (!userId?._id) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  const result = (await BlogModel.create(payload)).populate(
    'author',
    'name email role',
  );
  // const author = payload?.author;
  // const authorData = await User.findOne({ author });
  // const result = await BlogModel.create(payload);
  // return { result, authorData };
  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(BlogModel.find().populate('user'), query)
    .search(BlogSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const updateBlogInDB = async (
  id: string,
  userId: string,
  payload: Partial<TBlog>,
) => {
  // Find the blog by ID
  const blog = await BlogModel.findById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (blog.author.toString() !== userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this blog',
    );
  }

  const result = await BlogModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  // const author = await User.findOne(blog.author);

  return result;
};

const deleteBlogFromDB = async (
  id: string,
  userId: string,
  // userRole: string,
) => {
  const deleteBlogId = await BlogModel.findById(id);
  console.log(deleteBlogId);

  if (!deleteBlogId) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  // if (userRole !== 'admin') {
  if (deleteBlogId?.author.toString() !== userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to delete this blog',
    );
  }
  // }

  const result = await BlogModel.findByIdAndDelete(id);
  return result;
};

// if (deleteBlogId?.author.toString() !== userId) {
//   throw new AppError(
//     StatusCodes.FORBIDDEN,
//     'You are not authorized to update this blog',
//   );
// }

export const blogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogInDB,
  deleteBlogFromDB,
};
