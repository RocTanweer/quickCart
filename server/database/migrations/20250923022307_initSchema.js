/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  if (!(await knex.schema.hasTable("user"))) {
    await knex.schema.createTable("user", (table) => {
      table.increments("user_id").primary();
      table.string("name", 30).notNullable();
      table.string("email", 50).notNullable().unique();
      table.string("password", 255).notNullable();
      table.string("profile_image", 255).notNullable();
      table.enu("role", ["USER", "ADMIN"]).notNullable().defaultTo("USER");
    });
  }

  if (!(await knex.schema.hasTable("address"))) {
    await knex.schema.createTable("address", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("user")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("name", 45).notNullable();
      table.string("Mobile", 15).notNullable();
      table.integer("pin_code").notNullable();
      table.string("city", 45).notNullable();
      table.string("state", 45).notNullable();
      table.string("address_line_1", 45).notNullable();
      table.string("address_line_2", 45).notNullable();
    });
  }

  if (!(await knex.schema.hasTable("product_category"))) {
    await knex.schema.createTable("product_category", (table) => {
      table.increments("id").primary();
      table.string("name", 45).notNullable().unique();
      table.string("thumbnail", 255).notNullable();
    });
  }

  if (!(await knex.schema.hasTable("product_brand"))) {
    await knex.schema.createTable("product_brand", (table) => {
      table.increments("id").primary();
      table.string("name", 45).notNullable().unique();
    });
  }

  if (!(await knex.schema.hasTable("product"))) {
    await knex.schema.createTable("product", (table) => {
      table.increments("id").primary();
      table
        .integer("product_category_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("product_category")
        .onDelete("RESTRICT");
      table
        .integer("product_brand_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("product_brand")
        .onDelete("RESTRICT");
      table.decimal("unit_price", 9, 2).notNullable();
      table.integer("stock_quantity").notNullable().defaultTo(0);
      table.string("name", 150).notNullable();
      table.string("description", 500).notNullable();
      table.string("image", 255).notNullable();
    });
  }

  if (!(await knex.schema.hasTable("payment"))) {
    await knex.schema.createTable("payment", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("user")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("merchant_transaction_id", 100).notNullable();
      table.string("transaction_id", 100).notNullable();
      table.integer("amount").notNullable();
    });
  }

  if (!(await knex.schema.hasTable("shop_order"))) {
    await knex.schema.createTable("shop_order", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("user")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.dateTime("order_date").notNullable();
      table
        .integer("payment_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("payment")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("address_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("address")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("order_total").notNullable();
      table
        .enu("order_status", [
          "Pending",
          "Confirmed",
          "Processing",
          "Shipped",
          "Delivered",
          "Cancelled",
          "Returned",
        ])
        .notNullable();
    });
  }

  if (!(await knex.schema.hasTable("order_line"))) {
    await knex.schema.createTable("order_line", (table) => {
      table.increments("id").primary();
      table
        .integer("product_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("product")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("shop_order_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("shop_order")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.integer("quantity").notNullable();
      table.integer("price").notNullable();
    });
  }

  if (!(await knex.schema.hasTable("shopping_cart"))) {
    await knex.schema.createTable("shopping_cart", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("user")
        .onDelete("CASCADE");
    });
  }

  if (!(await knex.schema.hasTable("shopping_cart_item"))) {
    await knex.schema.createTable("shopping_cart_item", (table) => {
      table.increments("id").primary();
      table
        .integer("shopping_cart_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("shopping_cart")
        .onDelete("CASCADE");
      table
        .integer("product_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("product")
        .onDelete("CASCADE");
      table.integer("quantity").notNullable().defaultTo(1);
      table.unique(["shopping_cart_id", "product_id"]);
    });
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema
    .dropTableIfExists("shopping_cart_item")
    .dropTableIfExists("shopping_cart")
    .dropTableIfExists("order_line")
    .dropTableIfExists("shop_order")
    .dropTableIfExists("payment")
    .dropTableIfExists("product")
    .dropTableIfExists("product_brand")
    .dropTableIfExists("product_category")
    .dropTableIfExists("address")
    .dropTableIfExists("user");
}
