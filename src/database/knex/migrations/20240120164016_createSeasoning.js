exports.up = knex => knex.schema.createTable("seasoning", table => {
  table.increments("id").primary();
  table.integer("meal_id").references("id").inTable("meals").onDelete("CASCADE"); 
  table.text("name").notNullable(); 
});

exports.down = knex => knex.schema.dropTable("seasoning");
