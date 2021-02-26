import path from 'path';
import { StaticRouter, StaticRouterContext } from 'react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ChunkExtractor } from '@loadable/server';
import createSagaMiddleware, { END } from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/reducers';
import rootSaga from '@/saga';
import { userInfoActions } from '@/actions/user';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import App from '@/components/App';

const render = async (url: string):Promise<{html: string, context: StaticRouterContext}> => {
  const statsFile = path.resolve(process.cwd(), 'dist/stats.json');
  const context: StaticRouterContext = {};
  const extractor = new ChunkExtractor({
    entrypoints: ['client'],
    statsFile,
  });

  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
  });
  const sagaResult = sagaMiddleware.run(rootSaga);

  // @ts-ignore
  store.dispatch(userInfoActions.request());
  // @ts-ignore
  store.dispatch(END);
  await sagaResult.toPromise();

  const appHtml = renderToString(extractor.collectChunks(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Provider>,
  ));

  const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="theme-color" content="#3369F3">
        <meta name="description" content="Игра Змейка, написанная в рамках обучения по курсу Миддл фронтенд-разработчик на Яндекс.Практикум командой Дюссельдорф">
        <link rel="icon" href="/favicon.ico">
        <link rel="icon" href="/icon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
        <link rel="manifest" href="/manifest.json">
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
