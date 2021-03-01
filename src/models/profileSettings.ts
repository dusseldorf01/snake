export interface IProfileSettingsModel {
  firstName: string;
  secondName: string;
  login: string;
  email: string;
  phone: string;
  oldPassword: string;
  newPassword?: string;
  passwordRepeat?: string;
  avatar?: FormData | string;
  displayName?: string;
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
  displayName: '',
  passwordRepeat: '',
  avatar: '',
};
