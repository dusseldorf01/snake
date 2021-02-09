import { getOauthServiceId } from '@/api/oauth';

export default async function useOAuth(setState:CallableFunction) {
  const code = window.location.href.split('code=')[1];
  if (code) {
    setState((state:{[key:string]: string}) => ({ ...state, code }));
    return;
  }
  const serviceId = await getOauthServiceId();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { data: { service_id } } = serviceId;
  setState((state) => ({ ...state, serviceId: service_id }));
}
