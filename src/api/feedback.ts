import type { AxiosRequestConfig } from 'axios';
import apiInternal from '@/utils/apiInternal';
import type { IFeedback } from '@/models/feedback';
import type { TotalList } from '@/models/common';

const path = 'feedback';

export const getFeedback = () => apiInternal.get<TotalList<IFeedback>>(path);
export const sendFeedback = ({ data }: AxiosRequestConfig) => apiInternal.post(path, data);
