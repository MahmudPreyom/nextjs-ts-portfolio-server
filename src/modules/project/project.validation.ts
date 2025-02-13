import { z } from 'zod';

const createProjectValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title must be provided' }),
    description: z.string({ required_error: 'Description must be provided' }),
    projectImage: z.string({ required_error: 'Image must be provide' }),
    liveLinkUrl: z.string({ required_error: 'Url must be provide' }),
  }),
});
const updateProjectValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title must be provided' }).optional(),
    description: z
      .string({ required_error: 'Description must be provided' })
      .optional(),
    projectImage: z
      .string({ required_error: 'Image must be provide' })
      .optional(),
    liveLinkUrl: z.string({ required_error: 'Url must be provide' }).optional(),
  }),
});

export const ProjectValidationSchema = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
};
