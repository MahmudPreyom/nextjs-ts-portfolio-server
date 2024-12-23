import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const blogModelSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

export const BlogModel = model<TBlog>('Blog', blogModelSchema);
