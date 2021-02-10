import React, { useEffect, useState } from 'react';
import { signInOauthActions } from '@/actions/user';
import useOAuth from '@/hooks/useOAuth';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@/components/Alert';
import { userIsOauthAutorized } from '@/selectors/user';
import css from './index.css';

let canSendRequest = true;

const OauthLink = () => {
  const dispatch = useDispatch();
  const signInState = useSelector(userIsOauthAutorized);
  const [oauthOptions, setOauthOptions] = useState({
    serviceId: null,
    code: null,
    startLogingIn: false,
  });
  const { serviceId, code, startLogingIn } = oauthOptions;
  if (code) {
    if (canSendRequest) {
      canSendRequest = false;
      dispatch(signInOauthActions.request({ params: { data: { code } } }));
      setTimeout(() => {
        canSendRequest = true;
      },
      800);
    }
  }

  useEffect(() => {
    useOAuth(setOauthOptions);
  }, []);

  if (signInState.error) {
    return (
      <Alert>{signInState.error}</Alert>
    );
  }

  if (startLogingIn) {
    return (
      <Alert>Выполняется вход...</Alert>
    );
  }

  if (serviceId) {
    return (
      (
        <a className={css.oauthLink} href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}`}>
          <span>
            Войти через Яндекс
          </span>
        </a>
      )
    );
  }

  return (
    <Alert>Не возможно установить соединение</Alert>
  );
};

export default OauthLink;
