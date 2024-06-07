import { config } from 'dotenv';

config();

// App
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = parseInt(process.env.PORT, 10) || 4000;
export const LOG_LEVEL =
  process.env.LOG_LEVEL || 'log,error,warn,debug,verbose';
export const SERVER_URL = process.env.SERVER_URL;
export const LISTEN_ON = process.env.LISTEN_ON || '0.0.0.0';
export const TIMEZONE = process.env.TIMEZONE || 'Asia/Ho_Chi_Minh';
export const API_PREFIX = process.env.API_PREFIX || 'api';
export const PAGE_SIZE = parseInt(process.env.PAGE_SIZE, 10) || 20;
export const DOMAIN_WHITELIST = process.env.DOMAIN_WHITELIST || '*';

// THROTTLE
export const THROTTLE_TTL = parseInt(process.env.THROTTLE_TTL) || 300;
export const THROTTLE_LIMIT = parseInt(process.env.THROTTLE_LIMIT) || 300;

// BCRYPT_SALT
export const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT, 10) || 10;

// i18n
export const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || 'vi';

// JSON Web Token
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN;
export const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;
// DATABASE
export const DATABASE_CONNECTION =
  process.env.DATABASE_CONNECTION || 'postgres';
export const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
export const DATABASE_PORT = parseInt(process.env.DATABASE_PORT, 10) || 3306;
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'root';
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'password';
export const DATABASE_DB_NAME = process.env.DATABASE_DB_NAME || 'nest-starter';

export const SUPABASE_URL = process.env.SUPABASE_URL || '';
export const SUPABASE_KEY = process.env.SUPABASE_KEY || '';

// FILE
export const MAX_FILE_SIZE =
  parseInt(process.env.MAX_FILE_SIZE, 10) || 5 * 1024 * 1024;
export const MAX_FILE_SIZE_IMAGE =
  parseInt(process.env.MAX_FILE_SIZE_IMAGE, 10) || 5 * 1024 * 1024;
export const MAX_FILE_SIZE_VIDEO =
  parseInt(process.env.MAX_FILE_SIZE_VIDEO, 10) || 5 * 1024 * 1024;
export const UPLOAD_LOCATION = process.env.UPLOAD_LOCATION;

//  CONFIG CLOUD
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
export const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;

//  CONFIG Google Auth
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

//  CONFIG Firebase
export const FIREBASE_JSON = process.env.FIREBASE_JSON;

//  CONFIG getstream
export const GET_STREAM_KEY = process.env.GET_STREAM_KEY;
export const GET_STREAM_SECRET = process.env.GET_STREAM_SECRET;
