exports.up = knex => knex.schema.createTable("meals", table => {
  table.increments("id").primary();
  table.text("name").notNullable();
  table.binary("photo_food");
  table.text("description");
  table.decimal("price", 8, 2);
  table.integer("category_id").references("id").inTable("drinkEat");
});

exports.down = knex => knex.schema.dropTable("meals");

