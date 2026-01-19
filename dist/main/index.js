"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const app_1 = __importDefault(require("./app"));
const env_1 = require("@config/env");
const database_1 = __importDefault(require("@config/database"));
// Import all models to ensure they are registered with Sequelize before sync
require("@infrastructure/database/models");
if (env_1.config.NODE_ENV === "production") {
    console.log('Server is running in production mode');
}
else if (env_1.config.NODE_ENV === "development") {
    console.log('Server is running in development mode');
}
// Start server first
app_1.default.listen(env_1.config.PORT, () => {
    console.log(`Server is running on port ${env_1.config.PORT}`);
});
// Then sync database in background
console.log('Connecting to database...');
database_1.default
    .authenticate()
    .then(() => {
    console.log('Database connection authenticated!');
    return database_1.default.sync({ alter: true });
})
    .then(() => {
    console.log('Database synced successfully!');
})
    .catch((err) => {
    console.error('Failed to connect to DB:', err);
});
//# sourceMappingURL=index.js.map