import api, { addPrefix, ApiParams } from '@/utils/api';

const withPrefix = addPrefix('oauth');

const getOauthServiceId = () => api.get(withPrefix('yandex/service-id'));
const signInOauth = ({ data }:ApiParams) => api.post(withPrefix('yandex'), data);

export { getOauthServiceId, signInOauth };
