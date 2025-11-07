import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'seren_auraa'
  }
});

async function testConnection() {
  try {
    // Test connection
    await db.raw('SELECT 1+1 as result');
    console.log('✅ Database connection successful!');

    // Check if users table exists
    const hasUsersTable = await db.schema.hasTable('users');
    console.log(`Users table exists: ${hasUsersTable}`);

    if (hasUsersTable) {
      const columns = await db('users').columnInfo();
      console.log('Users table columns:', Object.keys(columns));
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await db.destroy();
  }
}

testConnection();
