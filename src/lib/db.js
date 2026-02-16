let sequelize = null;

try {
    // Force pg to be available to Sequelize
    const pg = require('pg');
    const { Sequelize } = require('sequelize');

    // Prefer a full connection string (e.g. Supabase DATABASE_URL). This supports SSL.
    // Accept NEXT_PUBLIC_DATABASE_URL as a fallback for environments where envs
    // were set with the NEXT_PUBLIC_ prefix (common in some setups).
    const connectionString = process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL;
    if (connectionString) {
        sequelize = new Sequelize(connectionString, {
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
        console.log('Database initialized using DATABASE_URL or NEXT_PUBLIC_DATABASE_URL');

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
    // Fallback to NEXT_PUBLIC_ prefixed DB_* variables if present (e.g., when envs
    // were set only with NEXT_PUBLIC_ prefix).
    } else if (process.env.NEXT_PUBLIC_DB_HOST && process.env.NEXT_PUBLIC_DB_USER && process.env.NEXT_PUBLIC_DB_PASS && process.env.NEXT_PUBLIC_DB_DATABASE) {
        sequelize = new Sequelize(
            process.env.NEXT_PUBLIC_DB_DATABASE,
            process.env.NEXT_PUBLIC_DB_USER,
            process.env.NEXT_PUBLIC_DB_PASS,
            {
                host: process.env.NEXT_PUBLIC_DB_HOST,
                dialect: 'postgres',
                logging: false,
                native: false,
                dialectModule: pg
            }
        );
        console.log('Database initialized using NEXT_PUBLIC_DB_* environment variables');
    }
} catch (error) {
    console.error('Database initialization error:', error.message);
    sequelize = null;
}

module.exports = sequelize;
