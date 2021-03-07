import React from 'react';
import useOAuth from '@/hooks/useOAuth';
import { useSelector } from 'react-redux';
import Alert from '@/components/Alert';
import { userIsOauthAutorized } from '@/selectors/user';
import cssCommon from '@/styles/common.css';
import Loader from '../Loader';
import css from './index.css';

const AppLoader = () => (
  <div className={cssCommon.centerContent}>
    <Loader />
  </div>
);

const OauthLink = () => {
  const signInState = useSelector(userIsOauthAutorized);
  const serviceId = useOAuth();
  if (signInState.error) {
    const errorText = signInState.data.reason ? `${signInState.data.reason}` : signInState.error;
    return <Alert>{errorText}</Alert>;
  }
  if (signInState.loading) {
    return <AppLoader />;
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
