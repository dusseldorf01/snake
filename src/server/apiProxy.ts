import { Application } from 'express';
import proxy from 'express-http-proxy';

type CookiePart = {
  name: string,
  value: string
};

const apiProxy = (app: Application):void => {
  app.use('/api', proxy('https://ya-praktikum.tech', {
    proxyReqPathResolver(req) {
      return new Promise((resolve) => {
        resolve(`/api${req.url}`);
      });
    },
    proxyReqOptDecorator(options) {
      const result = { ...options };
      const clearCookiePaths = ['/v2/auth/signin', '/v2/auth/signup'];
      if (clearCookiePaths.includes(options.path as string)) {
        if (!result.headers) {
          result.headers = {};
        }
        result.headers.cookie = '';
      }

      return result;
    },
    userResDecorator(_proxyRes, _proxyResData, _userReq, userRes) {
      const setCookieHeaders = userRes.getHeaders()['set-cookie'];
      if (setCookieHeaders && Array.isArray(setCookieHeaders)) {
        userRes.header(
          'set-cookie',
          setCookieHeaders.map((item) => {
            const cookie = item
              .split('; ')
              .map((part: string) => {
                const parts = part.split('=');
                return { name: parts[0], value: parts[1] };
              }).filter((part:CookiePart) => !['Domain', 'Secure', 'SameSite'].includes(part.name));

            return cookie.map((part:CookiePart) => `${part.name}${part.value ? `=${part.value}` : ''}`).join('; ');
          }),
        );
      }

      return _proxyResData.toString('utf8');
    },
  }));
};

export default apiProxy;
