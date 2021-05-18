import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error && process.env.NODE_ENV === 'development') {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
export default {
  /**
   * Your favorite port
   */
  host: process.env.HOST?.toString(),
  port: parseInt(process.env.PORT, 10) || 4000,
  socketPort: parseInt(process.env.SOCKET_PORT, 10),

  sierraApiUrl: process.env.SIERRA_API_URL,
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,

  /**
   * Password Hash secret
   */
  bcryptSalt: process.env.HASH_SALT,

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  databaseURI: process.env.MONGODB_URI,

  sportApiKey: process.env.SPORT_API_KEY,
};
