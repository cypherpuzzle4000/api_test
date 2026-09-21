require('dotenv').config();

const env = {
  PORT: Number(process.env.PORT || 5000),
  JWT_SECRET: process.env.JWT_SECRET || 'development_secret_change_me',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

if (env.NODE_ENV === 'production' && env.JWT_SECRET === 'development_secret_change_me') {
  console.warn('Warning: JWT_SECRET is using a default development value. Set a secure secret in production.');
}

module.exports = env;
