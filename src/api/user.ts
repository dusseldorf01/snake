import api, { addPrefix, ApiParams } from '@/utils/api';
import type { IUser } from '@/models/user';

const withPrefix = addPrefix('user');

export const changeUserProfile = ({ data }: ApiParams) => api.put(withPrefix('profile'), data);
export const changeUserAvatar = ({ data }: ApiParams) => api.put(withPrefix('profile/avatar'), data, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const changeUserPassword = ({ data }: ApiParams) => api.put(withPrefix('password'), data);
export const getUserById = (id: number) => api.get<IUser>(`user/${id}`);
