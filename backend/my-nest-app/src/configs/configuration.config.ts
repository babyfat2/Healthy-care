import { registerAs } from '@nestjs/config';

/**
 * Base configuration for the application.
 * This configuration contains essential settings
 * such as the server port and API prefix.
 */
export default registerAs('base', () => ({
  /**
   * Defines the port the application will run on.
   * It first tries to read from the environment variable `PORT`.
   * If `PORT` is not set, it defaults to 3000.
   */
  port: parseInt(process.env.PORT ?? "3000", 10),

  /**
   * Sets the API route prefix that will be used across the application.
   * In this case, the API prefix is set to '/api'.
   * This helps in organizing routes under a common base path.
   */
  prefix: '/api',
}));
