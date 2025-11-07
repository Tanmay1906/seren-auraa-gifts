/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  // Create users table
  await knex.schema.createTableIfNotExists('users', function(table) {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('email', 100).notNullable().unique();
    table.string('password', 255).notNullable();
    table.enum('role', ['user', 'admin']).defaultTo('user');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    console.log('Created users table');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users');
};
