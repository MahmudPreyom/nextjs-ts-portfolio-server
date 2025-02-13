import { model, Schema } from 'mongoose';
import { TProject } from './project.interface';

const ProjectModelSchema = new Schema<TProject>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    projectImage: {
      type: String,
    },
    liveLinkUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const ProjectModel = model<TProject>('Project', ProjectModelSchema);
