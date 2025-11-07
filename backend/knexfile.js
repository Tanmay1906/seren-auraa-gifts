import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'seren_auraa',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    },
    migrations: {
      directory: './src/db/migrations',
      tableName: 'knex_migrations',
      loadExtensions: ['.cjs']
    },
    seeds: {
      directory: './src/db/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/db/migrations',
      tableName: 'knex_migrations',
      loadExtensions: ['.js']
    },
    ssl: { 
      rejectUnauthorized: false 
    }
  }
};

export default config;
