import { Router } from 'express';
import authentication from '@/server/middlewares/authentication';
import getRoutes from '@/utils/api/getRoutes';
import forumRoutes from './forum';
import themeRoutes from './theme';
import userThemeRoutes from './userTheme';
import feedbackRoutes from './feedback';

const router: Router = Router();

getRoutes(router, forumRoutes, authentication);

getRoutes(router, themeRoutes);

getRoutes(router, userThemeRoutes, authentication);

getRoutes(router, feedbackRoutes, authentication);

export default router;
