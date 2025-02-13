import { Types } from 'mongoose';

export type TProject = {
  title: string;
  description: string;
  author: Types.ObjectId;
  projectImage: string;
  liveLinkUrl: string;
};
