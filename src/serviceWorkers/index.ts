/* eslint no-underscore-dangle: 0 */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare const self:any;

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  '/',
  new NetworkFirst({
    cacheName: 'html',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);
