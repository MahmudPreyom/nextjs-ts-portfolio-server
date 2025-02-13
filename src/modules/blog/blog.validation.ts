import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title must be provided' }),
    description: z.string({ required_error: 'Description must be provided' }),
    blogImage: z.string({ required_error: 'Image must be provide' }),
  }),
});
const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title must be provided' }).optional(),
    description: z
      .string({ required_error: 'Description must be provided' })
      .optional(),
    blogImage: z.string({ required_error: 'Image must be provide' }).optional(),
  }),
});

export const blogValidationSchema = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
