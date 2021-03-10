import type { Express } from 'express';
import sequelize from './connection';
import defaultThemes from './data/themes';
import { create as createTheme } from './services/ThemesService';

const startApp = async (app: Express, port: string | number) => {
  try {
    await sequelize.sync({ force: true });

    await Promise.all(defaultThemes.map((theme) => (
      createTheme(theme)
    )));

    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  app.listen(port, () => console.log(`listening on port ${port}!`));
};

export default startApp;
