const pg = require('pg');
const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('Testing DB connection...');
const connectionString = process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL;

if (!connectionString) {
    console.error('No connection string found in environment variables.');
    process.exit(1);
}

console.log('Connection string found (length: ' + connectionString.length + ')');
console.log('Using connection string starting with: ' + connectionString.substring(0, 15) + '...');

try {
    const sequelize = new Sequelize(connectionString, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: console.log, // Enable logging for debugging
        native: false,
        dialectModule: pg,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });

    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
            process.exit(0);
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            process.exit(1);
        });

} catch (error) {
    console.error('Sequelize initialization error:', error);
    process.exit(1);
}
