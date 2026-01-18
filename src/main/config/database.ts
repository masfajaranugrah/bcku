// import { config } from "./env";
// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(config.DATABASE_URL, {
//   dialect: 'postgres',
//   dialectOptions: {
//   ssl: config.isProd ? { rejectUnauthorized: false } : false,
// },
//   logging : false
// });

// export default sequelize;
import { config } from "./env";
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASS,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: config.isProd ? { rejectUnauthorized: false } : false,
    },
    logging: false,
  }
);

export default sequelize;
