exports.up = knex => knex.schema.createTable("selected", table => {
  table.increments("id").primary();
  table.integer("dishDetails_id").references("id").inTable("dishDetails").onDelete("CASCADE");
  table.integer("meal_id").references("id").inTable("meals");
  table.float("amount");
  table.decimal("unit_price", 6, 2);
  table.decimal("total_price", 6, 2);
});

exports.down = knex => knex.schema.dropTable("selected");
