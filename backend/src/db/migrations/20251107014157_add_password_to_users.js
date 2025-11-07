/**
 * @type {import('knex').Knex}
 */
// @ts-check

/**
 * @param {import("knex").Knex} knex
 */
export async function up(knex) {
  const hasColumn = await knex.schema.hasColumn('users', 'password_hash');
  if (!hasColumn) {
    await knex.schema.table('users', function(table) {
      table.string('password_hash', 255).notNullable().defaultTo('');
    });
  }
}

/**
 * @param {import("knex").Knex} knex
 */
export async function down(knex) {
  if (await knex.schema.hasColumn('users', 'password_hash')) {
    await knex.schema.table('users', function(table) {
      table.dropColumn('password_hash');
    });
  }
}
