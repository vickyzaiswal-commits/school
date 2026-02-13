// Run with: node src/lib/seeders/seedUser.js
// Inserts or updates an admin user. Loads .env, connects via src/lib/models

require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('../models');

async function run() {
  if (!db || !db.sequelize) {
    console.error('Database not initialized. Check src/lib/db.js');
    process.exit(1);
  }

  try {
    await db.sequelize.authenticate();
    console.log('Database connection OK');
    console.log('DB_SYNC:', process.env.DB_SYNC || 'unset');
    console.log('Using DATABASE_URL:', !!process.env.DATABASE_URL ? '[REDACTED]' : 'none');

    const name = 'vicky';
    const email = 'vickyzaiswal@gmail.com'.trim().toLowerCase();
    const rawPassword = 'Vicky@@1234';
    const role = 'admin'; // User model expects 'admin' or 'user'

    const hashed = await bcrypt.hash(rawPassword, 10);

    console.log('Finding or creating user:', email);
    const [user, created] = await db.User.findOrCreate({
      where: { email },
      defaults: { name, email, password: hashed, role }
    });

    console.log('findOrCreate result - created:', created);
    if (!user) {
      console.error('findOrCreate did not return a user object');
      process.exit(1);
    }

    if (!created) {
      const needsUpdate = user.password !== hashed || user.name !== name || user.role !== role;
      if (needsUpdate) {
        user.name = name;
        user.password = hashed;
        user.role = role;
        await user.save();
        console.log('Existing user updated');
      } else {
        console.log('User already exists and is up-to-date');
      }
    } else {
      console.log('User created');
    }

    const out = user.toJSON();
    delete out.password;
    console.log('Final user record:', out);
    // Wait briefly to ensure DB writes are flushed before exit
    setTimeout(() => process.exit(0), 300);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

run();

// node src/lib/seeders/seedUser.js