/**
 * JWT configuration constants.
 * This object holds configuration values related to JSON Web Tokens (JWT) used for authentication.
 */
export const jwtConstants = {
    /**
     * The secret key used for signing JWTs.
     * This key should be kept secure and not exposed in the codebase.
     * It is used to validate the authenticity of the JWT during verification.
     */
    secret: 'secretKey',
  
    /**
     * The expiration time of the JWT.
     * This determines how long the JWT is valid before it expires.
     * In this case, the token will expire in 7 days (`'7d'`).
     */
    expiredTime: '7d',
  };
  