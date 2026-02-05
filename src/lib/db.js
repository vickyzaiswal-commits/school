let sequelize = null;

try {
    // Force pg to be available to Sequelize
    const pg = require('pg');
    const { Sequelize } = require('sequelize');
    
    if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS && process.env.DB_DATABASE) {
        sequelize = new Sequelize(
            process.env.DB_DATABASE,
            process.env.DB_USER,
            process.env.DB_PASS,
            {
                host: process.env.DB_HOST,
                dialect: 'postgres',
                logging: false,
                native: false,
                // Explicitly use pg
                dialectModule: pg
            }
        );
        console.log('Database initialized successfully');
    }
} catch (error) {
    console.error('Database initialization error:', error.message);
    sequelize = null;
}

module.exports = sequelize;
