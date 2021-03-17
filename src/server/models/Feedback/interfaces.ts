import type { Document } from 'mongoose';
import type { IFeedback as IFeedbackModel } from '@/models/feedback';

export interface IFeedback extends Document, IFeedbackModel {
  createdAt: string;
  updatedAt: string;
}

export interface IFeedbackCreate extends IFeedbackModel {}
