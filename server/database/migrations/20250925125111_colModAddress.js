/**
 * @param { import("knex").Knex } knex
 */
export async function up(knex) {
  await knex.schema.alterTable("address", (table) => {
    table.renameColumn("Mobile", "mobile");
    table.string("pin_code", 6).notNullable().alter();
  });
}

/**
 * @param { import("knex").Knex } knex
 */
export async function down(knex) {
  await knex.schema.alterTable("address", (table) => {
    table.renameColumn("mobile", "Mobile");
    table.integer("pin_code").notNullable().alter();
  });
}
