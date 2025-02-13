import QueryBuilder from '../../app/builder/QueryBuilder';
import AppError from '../../app/errors/AppError';
import { User } from '../user/user.model';
import { StatusCodes } from 'http-status-codes';
import { TProject } from './project.interface';
import { ProjectModel } from './project.model';
import { ProjectSearchableFields } from './project.const';

const createProjectIntoDB = async (payload: TProject, id: string) => {
  const userId = await User.findById(id);
  if (!userId?._id) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  const result = (await ProjectModel.create(payload)).populate(
    'author',
    'name email role',
  );

  return result;
};

const getAllProjectsFromDB = async (query: Record<string, unknown>) => {
  const projectsQuery = new QueryBuilder(
    ProjectModel.find().populate('author'),
    query,
  )
    .search(ProjectSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await projectsQuery.modelQuery;
  return result;
};

const getSingleProjectFromDB = async (id: string) => {
  const result = await ProjectModel.findById(id);
  return result;
};

const updateProjectInDB = async (
  id: string,
  userId: string,
  payload: Partial<TProject>,
) => {
  // Find the blog by ID
  const project = await ProjectModel.findById(id);

  if (!project) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found');
  }

  if (project.author.toString() !== userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this project',
    );
  }

  const result = await ProjectModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteProjectFromDB = async (id: string, userId: string) => {
  const deleteProjectId = await ProjectModel.findById(id);

  if (!deleteProjectId) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found');
  }

  if (deleteProjectId?.author.toString() !== userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to delete this project',
    );
  }

  const result = await ProjectModel.findByIdAndDelete(id);
  return result;
};

export const ProjectServices = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  updateProjectInDB,
  deleteProjectFromDB,
  getSingleProjectFromDB,
};
