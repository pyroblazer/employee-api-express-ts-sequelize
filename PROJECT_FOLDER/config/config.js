const dotenv = require("dotenv");

dotenv.config();

const config = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_DATABASE,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    dialect: process.env.DEV_DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: process.env.DEV_DB_SSL_REQUIRE !== "false",
        rejectUnauthorized:
          process.env.DEV_DB_SSL_REJECT_UNAUTHORIZED !== "false",
      },
    },
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_DATABASE,
    host: process.env.TEST_DB_HOST,
    port: process.env.TEST_DB_PORT,
    dialect: process.env.TEST_DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: process.env.TEST_DB_SSL_REQUIRE !== "false",
        rejectUnauthorized:
          process.env.TEST_DB_SSL_REJECT_UNAUTHORIZED !== "false",
      },
    },
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    dialect: process.env.PROD_DB_DIALECT,
    dialectOptions: {},
  },
};

module.exports = config;
