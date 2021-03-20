export interface IFeedbackCreateModel {
  title: string;
  message: string;
}

export interface IFeedback extends IFeedbackCreateModel {
  userId: number;
}

export const feedbackInitialModel: IFeedbackCreateModel = {
  title: '',
  message: '',
};
