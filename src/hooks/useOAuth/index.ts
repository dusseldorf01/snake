import { getOauthServiceId } from '@/api/oauth';

export default async function useOAuth(setState:CallableFunction) {
  const code = window.location.href.split('code=')[1];
  if (code) {
    setState((state:{
      serviceId: null|number,
      code: null|number,
      startLogingIn:boolean }) => ({ ...state, startLogingIn: true, code }));
    return;
  }
  const serviceId = await getOauthServiceId();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { data: { service_id } } = serviceId;
  setState((state:{
    serviceId: null|number,
    code: null|number,
    startLogingIn:boolean }) => ({ ...state, serviceId: service_id }));
}
