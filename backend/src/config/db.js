import knex from 'knex';
import config from '../../knexfile.js';

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

// Initialize knex with the configuration
export const db = knex(dbConfig);

// Test the database connection
export const testConnection = async () => {
  try {
    await db.raw('SELECT 1');
    console.log('PostgreSQL connected successfully');
    return true;
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    return false;
  }
};

// Handle database connection on app start
export const initializeDB = async () => {
  const isConnected = await testConnection();
  if (!isConnected) {
    throw new Error('Failed to connect to PostgreSQL');
  }
};

export default db;
