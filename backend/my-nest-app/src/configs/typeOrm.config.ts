import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

// Load environment variables from the .env file
dotenv.config({ path: '.env' });


// TypeORM configuration for MySQL database connection
export const typeOrmConfig: TypeOrmModuleOptions = {
  
  /**
   * The type of database being used, in this case, MySQL.
   * TypeORM supports multiple database types such as MySQL, PostgreSQL, SQLite, etc.
   */
  type: 'mysql',

  /**
   * The host of the MySQL database server.
   * Retrieved from the MYSQL_HOST environment variable.
   */
  host: process.env.SQL_HOST,

  /**
   * The port of the MySQL server.
   * The default port is 3306, but it can be overridden via the MYSQL_PORT environment variable.
   */
  port: Number(process.env.SQL_PORT),

  /**
   * The username to authenticate with the MySQL database.
   * Retrieved from the MYSQL_USERNAME environment variable.
   */
  username: process.env.SQL_USER,

  /**
   * The password for the MySQL user.
   * Retrieved from the MYSQL_PASSWORD environment variable.
   */
  password: process.env.SQL_PASSWORD,

  /**
   * The name of the MySQL database to connect to.
   * Retrieved from the MYSQL_DATABASE environment variable.
   */
  database: process.env.SQL_DATABASE,

  /**
   * Automatically load the entities defined in the application.
   * This allows TypeORM to find and automatically connect to the defined entities.
   */
  autoLoadEntities: true,

  /**
   * Whether or not to automatically synchronize the database schema with the entities.
   * It's recommended to set this to false in production to avoid data loss.
   */
  synchronize: false,

  /**
   * The number of retry attempts when the initial connection fails.
   * This is set to retry 3 times in case of failure.
   */
  retryAttempts: 3,

  /**
   * The timezone setting for the database connection.
   * 'Z' represents UTC (Coordinated Universal Time).
   */
  extra: {
    options: '-c timezone=UTC',
  },

  /**
   * Enables or disables SQL query logging.
   * Set to `false` to disable logging of SQL queries.
   * You can set this to `true` during development to log SQL queries for debugging.
   */
  logging: false,

  /**
   * List of entities used in the application.
   * These entities are used by TypeORM to create tables and perform queries.
   */
  entities: ['dist/entities/*.entity.js'],

  /**
   * List of migration scripts to manage schema changes over time.
   * Migrations allow you to track and apply changes to the database schema.
   */
  migrations: ['dist/migration/*.js'],

  /**
   * The name of the table where migration history is stored.
   * The default is `migrations`, but you can change it if needed.
   */
  migrationsTableName: 'migrations',
};

// Initialize a TypeORM DataSource instance with the defined configuration
export const dataSource = new DataSource(typeOrmConfig as DataSourceOptions);