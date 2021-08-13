import { ConnectionOptions } from 'typeorm';
import * as path from 'path';

import AppConfig from './app';

/*
You can load you .env file here synchronously using dotenv package (not installed here),
import * as dotenv from 'dotenv';
import * as fs from 'fs';
const environment = process.env.NODE_ENV || 'development';
const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
You can also make a singleton service that load and expose the .env file content.
...

Check typeORM documentation for more information.
*/

const OrmConfig: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.dirname(__dirname) + '/**/*.entity{.ts,.js}'],
  // Synchronize entity changes with database structure.
  // Beware, can lead to  unexpected outcomes.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: !AppConfig.isProduction,
  logger: 'file',

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [path.dirname(__dirname) + '/migrations/**/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
  },
};
export default OrmConfig;
