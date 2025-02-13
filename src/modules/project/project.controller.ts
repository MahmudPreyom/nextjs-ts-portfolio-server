/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import { ProjectServices } from './project.service';

const createProject = catchAsync(async (req, res) => {
  const author = req.user?._id;

  if (!author) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User not authenticated');
  }

  const projectData = {
    ...req.body,
    author: author,
  };

  const result = await ProjectServices.createProjectIntoDB(projectData, author);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Project created successfully',
    data: {
      _id: result._id,
      title: result.title,
      description: result?.description,
      author: result?.author,
    },
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const result = await ProjectServices.getAllProjectsFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project fetched successfully',
    data: result,
  });
});

const getSingleProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectServices.getSingleProjectFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project fetched successfully',
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;
  const result = await ProjectServices.updateProjectInDB(id, userId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project updated successfully',
    data: {
      _id: result?._id,
      title: result?.title,
      description: result?.description,
      author: result?.author,
    },
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;

  const result = await ProjectServices.deleteProjectFromDB(id, userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
  getSingleProject,
};
