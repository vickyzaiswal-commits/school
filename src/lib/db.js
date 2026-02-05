let sequelize = null;

try {
    // Force pg to be available to Sequelize
    const pg = require('pg');
    const { Sequelize } = require('sequelize');

    // Prefer a full connection string (e.g. Supabase DATABASE_URL). This supports SSL.
    if (process.env.DATABASE_URL) {
        sequelize = new Sequelize(process.env.DATABASE_URL, {
            dialect: 'postgres',
            protocol: 'postgres',
            logging: false,
            native: false,
            dialectModule: pg,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        });
        console.log('Database initialized using DATABASE_URL');

    // Fall back to individual DB_* env vars for local dev if needed
    } else if (process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS && process.env.DB_DATABASE) {
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
        console.log('Database initialized using DB_* environment variables');
    }
} catch (error) {
    console.error('Database initialization error:', error.message);
    sequelize = null;
}

module.exports = sequelize;
