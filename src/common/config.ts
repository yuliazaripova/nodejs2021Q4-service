import dotenv from "dotenv"
import path from "path"

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

// enum loggerLevel {
//   fatal: 'fatal', error: 'error', warn: 'warn', info: 'info', debug: 'debug', trace: 'trace'
// }

const CONFIG = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOGGER_LEVEL: process.env.LOGGER_LEVEL,
};

export default CONFIG