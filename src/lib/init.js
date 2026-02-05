// Initialize database on startup (run once)
import db from './models';

export async function initializeDatabase() {
  try {
    // Test connection
    await db.sequelize.authenticate();
    console.log('✅ Database connected');

    // Sync models
    await db.sequelize.sync({ alter: true });
    console.log('✅ Database synchronized');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
}
