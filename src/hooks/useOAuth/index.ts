import { getOauthServiceId } from '@/api/oauth';
import { useEffect, useState } from 'react';
import { signInOauthActions } from '@/actions/user';
import { useDispatch } from 'react-redux';

export default function useOAuth() {
  const dispatch = useDispatch();
  const code = window.location.href.split('code=')[1];
  const [serviceId, setAppId] = useState({ serviceId: null });

  useEffect(() => {
    if (code) {
      dispatch(signInOauthActions.request({ params: { data: { code } } }));
    } else {
      getOauthServiceId()
        .then((data) => {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          const { data: { service_id } } = data;
          setAppId(service_id);
        });
    }
  }, []);

  if (serviceId) return serviceId;
  return null;
}
