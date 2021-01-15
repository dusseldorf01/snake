export interface IProfileSettingsModel {
  firstName: string;
  secondName: string;
  login: string;
  email: string;
  phone: string;
  password: string;
  passwordRepeat: string;
  avatar?: string;
  file?: FormData;
}

export const profileSettingsInitialModel: IProfileSettingsModel = {
  firstName: '',
  secondName: '',
  login: '',
  email: '',
  phone: '',
  password: '',
  passwordRepeat: '',
  avatar: '',
};
