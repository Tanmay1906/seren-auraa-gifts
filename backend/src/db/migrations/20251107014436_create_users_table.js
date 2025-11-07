/**
 * @type {import('knex').Knex}
 */
// @ts-check

/**
 * @param {import("knex").Knex} knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const hasTable = await knex.schema.hasTable('users');
  if (!hasTable) {
    await knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name', 100).notNullable();
      table.string('email', 100).notNullable().unique();
      table.string('password', 255).notNullable();
      table.enum('role', ['user', 'admin']).defaultTo('user');
      table.timestamps(true, true);
    });
  }
};

/**
 * @param {import("knex").Knex} knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users');
};
