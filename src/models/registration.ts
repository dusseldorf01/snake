export interface IRegistrationModel {
  firstName: string;
  secondName: string;
  login: string;
  email: string;
  phone: string;
  password: string;
  passwordRepeat: string;
}

export const registrationInitialModel: IRegistrationModel = {
  firstName: '',
  secondName: '',
  login: '',
  email: '',
  phone: '',
  password: '',
  passwordRepeat: '',
};
