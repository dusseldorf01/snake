import api, { addPrefix, ApiParams } from '@/utils/api';

const withPrefix = addPrefix('leaderboard');

export const addScoreToLeaderboardRequest = ({ data }: ApiParams) => api.post(withPrefix(''), data);
export const getAllScoreFromLeaderboardRequest = ({ data }: ApiParams) => api.post(withPrefix('all'), data);
