exports.up = knex => knex.schema.createTable("mixture", table => {
  table.increments("id").primary();
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
  table.integer("meal_id").references("id").inTable("meals").onDelete("CASCADE");
});


exports.down = knex => knex.schema.dropTable("mixture");

