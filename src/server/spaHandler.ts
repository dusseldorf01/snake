import api, { DEFAULT_API_URL } from '@/utils/api';
import render from '@/server/render';
import { Request, Response } from 'express';

const spaHandler = async (req: Request, res: Response, port: number | string) => {
  api.defaults.headers.cookie = req.headers.cookie;
  api.defaults.baseURL = `http://localhost:${port}${DEFAULT_API_URL}`;

  const { html, context } = await render(req.originalUrl);

  if (context.url) {
    res.redirect(301, context.url);
  } else {
    res.status(200).send(html);
  }
};

export default spaHandler;
