/* eslint no-underscore-dangle: 0 */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

declare const self:any;

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  '/',
  new NetworkFirst({
    cacheName: 'html',
  }),
);

registerRoute(
  'https://ya-praktikum.tech/api/v2/auth/user',
  new NetworkFirst({
    cacheName: 'user',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 60 * 60 * 24, // One day
      }),
    ],
  }),
);
