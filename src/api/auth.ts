import api, { addPrefix, ApiParams } from '@/utils/api';

const withPrefix = addPrefix('auth');

export const signUp = ({ data }: ApiParams) => api.post(withPrefix('signup'), data);
export const signIn = ({ data }: ApiParams) => api.post(withPrefix('signin'), data);
export const signOut = () => api.post(withPrefix('logout'));
export const getUserInfo = () => api.get(withPrefix('user'));
