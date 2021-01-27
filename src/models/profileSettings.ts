export interface IProfileSettingsModel {
  firstName: string;
  secondName: string;
  login: string;
  email: string;
  phone: string;
  oldPassword: '',
  newPassword: '',
  avatar?: string;
  file?: FormData;
}

export const profileSettingsInitialModel: IProfileSettingsModel = {
  firstName: '',
  secondName: '',
  login: '',
  email: '',
  phone: '',
  oldPassword: '',
  newPassword: '',
  avatar: '',
};
