import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ProjectController } from './project.controller';
import { ProjectValidationSchema } from './project.validation';

const ProjectsRoutes = Router();

ProjectsRoutes.post(
  '/',
  auth('user'),
  validateRequest(ProjectValidationSchema.createProjectValidationSchema),
  ProjectController.createProject,
);

ProjectsRoutes.get('/', ProjectController.getAllProjects);

ProjectsRoutes.get('/singleProject/:id', ProjectController.getSingleProject);

ProjectsRoutes.patch('/:id', auth('user'), ProjectController.updateProject);

ProjectsRoutes.delete(
  '/:id',
  auth('user'),
  validateRequest(ProjectValidationSchema.updateProjectValidationSchema),
  ProjectController.deleteProject,
);

export default ProjectsRoutes;
