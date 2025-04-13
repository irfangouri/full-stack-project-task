const config = {
  development: {
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URL: process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
  },
  production: {
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URL: process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
  },
};

module.exports = config[process.env.NODE_ENV];
