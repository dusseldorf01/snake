export interface IFeedbackModel {
  name: string;
  email: string;
  phone: string;
  message:string;
}

export const feedbackInitialModel: IFeedbackModel = {
  name: '',
  email: '',
  phone: '',
  message: '',
};
