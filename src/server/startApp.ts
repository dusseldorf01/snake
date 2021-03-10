import type { Express } from 'express';
import mongoose from 'mongoose';
import sequelize from './connection';
import defaultThemes from './data/themes';
import { create as createTheme } from './services/ThemesService';

const startApp = async (app: Express, port: string | number) => {
  try {
    const MONGODB_HOST = process.env.MONGODB_HOST || 'localhost';
    const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
    const MONGODB_NAME = process.env.MONGO_INITDB_DATABASE || 'snake';

    await mongoose.connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

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
