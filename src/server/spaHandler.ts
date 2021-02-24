import render from '@/server/render';
import { Request, Response } from 'express';

const spaHandler = async (req: Request, res: Response) => {
  const { html, context } = await render(req.originalUrl);

  if (context.url) {
    res.redirect(301, context.url);
  } else {
    res.status(200).send(html);
  }
};

export default spaHandler;
