import type { AxiosRequestConfig } from 'axios';
import apiInternal from '@/utils/apiInternal';
import type { IUserTheme } from '@/models/theme';

const path = 'user-theme';

export const getUserTheme = (data?: AxiosRequestConfig) => apiInternal.get<IUserTheme>(path, data);
export const updateUserTheme = ({ data }: AxiosRequestConfig) => apiInternal.patch(path, data);
