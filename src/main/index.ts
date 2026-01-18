// import 'module-alias/register';

import app from "./app";
import { config } from "@config/env";
import sequelize from "@config/database";
// Import all models to ensure they are registered with Sequelize before sync
import "@infrastructure/database/models";

if (config.NODE_ENV === "production") {
    console.log('Server is running in production mode');
} else if (config.NODE_ENV === "development") {
    console.log('Server is running in development mode');
}

// Start server first
app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});

// Then sync database in background
console.log('Connecting to database...');
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection authenticated!');
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log('Database synced successfully!');
    })
    .catch((err: any) => {
        console.error('Failed to connect to DB:', err);
    });
