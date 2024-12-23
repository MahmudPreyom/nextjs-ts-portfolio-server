import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title must be provided' }),
    content: z.string({ required_error: 'Content must be provided' }),
  }),
});
const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title must be provided' }).optional(),
    content: z
      .string({ required_error: 'Content must be provided' })
      .optional(),
  }),
});

export const blogValidationSchema = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
