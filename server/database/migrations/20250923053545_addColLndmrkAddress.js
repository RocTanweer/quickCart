/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  const hasLandmark = await knex.schema.hasColumn("address", "landmark");
  if (!hasLandmark) {
    await knex.schema.alterTable("address", (table) => {
      table.string("landmark", 45).notNullable().after("address_line_2");
    });
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  const hasLandmark = await knex.schema.hasColumn("address", "landmark");
  if (hasLandmark) {
    await knex.schema.alterTable("address", (table) => {
      table.dropColumn("landmark");
    });
  }
}
