const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'seren_auraa'
  },
  debug: true
});

async function runMigration() {
  try {
    // Test connection
    await knex.raw('SELECT 1');
    console.log('✅ Database connection successful!');

    // Run migration
    console.log('Running migration...');
    await knex.migrate.latest();
    console.log('✅ Migration completed successfully!');

    // Check if users table exists
    const hasUsersTable = await knex.schema.hasTable('users');
    console.log(`Users table exists: ${hasUsersTable}`);

    if (hasUsersTable) {
      const columns = await knex('users').columnInfo();
      console.log('Users table columns:', Object.keys(columns));
    }
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await knex.destroy();
  }
}

runMigration();
