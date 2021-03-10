import path from 'path';
import { StaticRouter, StaticRouterContext } from 'react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ChunkExtractor } from '@loadable/server';
import createSagaMiddleware, { END } from 'redux-saga';
import rootSaga from '@/saga';
import { userInfoActions } from '@/actions/user';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import App from '@/components/App';
import createStore from '@/store';
import userThemeActions from '@/actions/userTheme';
import cssRoot from '@/styles/variables.css';
import { getUserInfo } from '@/api/auth';
import { getByUserId as getThemeByUserId } from '@/server/services/UserThemesService';
import type { IUserTheme } from '@/models/theme';

const render = async (url: string):Promise<{html: string, context: StaticRouterContext}> => {
  const statsFile = path.resolve(process.cwd(), 'dist/stats.json');
  const context: StaticRouterContext = {};
  const extractor = new ChunkExtractor({
    entrypoints: ['client'],
    statsFile,
  });

  const sagaMiddleware = createSagaMiddleware();
  const { store } = createStore(sagaMiddleware, url, false);
  const sagaResult = sagaMiddleware.run(rootSaga);

  const getUserInfoRequest = () => getUserInfo()
    .then((response) => {
      store.dispatch(userInfoActions.success({ status: response.status, data: response.data }));

      return Promise.resolve({ userId: response.data.id });
    })
    .catch((error) => {
      const { response } = error;

      store.dispatch(userInfoActions.error({
        status: response?.status,
        data: response?.data || {},
        error: error.toString(),
      }));
    })
    .then((response) => {
      if (response) {
        const { userId } = response;

        return getThemeByUserId(userId);
      }

      return Promise.reject();
    })
    .then(([theme]) => {
      store.dispatch(userThemeActions.success({
        status: 200,
        data: theme as unknown as IUserTheme,
      }));
    })
    .catch(() => {
      // error
    });

  await getUserInfoRequest()
    .then(() => {
      store.dispatch(END);
    });
  await sagaResult.toPromise();
  const { themeName } = store.getState().userTheme.data;

  const appHtml = renderToString(extractor.collectChunks(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Provider>,
  ));

  const html = `
    <!doctype html>
    <html lang="ru" class="${cssRoot[themeName]}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>Змейка</title>
        ${extractor.getStyleTags()}
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script id="preloadedState">window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}</script>
        ${extractor.getScriptTags()}
      </body>
    </html>
  `.trim();

  return { html, context };
};

export default render;
