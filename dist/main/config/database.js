"use strict";
// import { config } from "./env";
// const { Sequelize } = require('sequelize');
Object.defineProperty(exports, "__esModule", { value: true });
// const sequelize = new Sequelize(config.DATABASE_URL, {
//   dialect: 'postgres',
//   dialectOptions: {
//   ssl: config.isProd ? { rejectUnauthorized: false } : false,
// },
//   logging : false
// });
// export default sequelize;
const env_1 = require("./env");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(env_1.config.DB_NAME, env_1.config.DB_USER, env_1.config.DB_PASS, {
    host: env_1.config.DB_HOST,
    port: env_1.config.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
        ssl: env_1.config.isProd ? { rejectUnauthorized: false } : false,
    },
    logging: false,
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map