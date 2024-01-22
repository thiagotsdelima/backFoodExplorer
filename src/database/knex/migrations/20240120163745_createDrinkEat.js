exports.up = knex => knex.schema.createTable("drinkEat", table => {
  table.increments("id").primary();
  table.text("name");
});


exports.down = knex => knex.schema.dropTable("drinkEat");

