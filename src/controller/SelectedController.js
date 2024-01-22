const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class SelectedController {
  async create(request, response) {
    const { items, dishDetails_id } = request.body;
    console.log("Received dishDetails_id:", dishDetails_id);
    await knex.transaction(async trx => {
      const itemsToInsert = items.map(item => {
        if (!item.meal_id) {
            throw new AppError("Meal ID is missing.");
        }
        const newItem = {
            amount: item.amount,
            dishDetails_id,
            meal_id: item.meal_id,
            unit_price: item.unit_price,
            total_price: item.unit_price * item.amount
        };
        console.log("Inserting item:", newItem);
        return newItem;
    });

        await trx("selected").insert(itemsToInsert);
    });

    return response.json();
}



  
async update(request, response) {
  const { id } = request.params;
  const { meal_id, amount, unit_price } = request.body;

  const updatedSelect = await knex("selected").where({ id }).first();
  const meal = await knex("meals").where({ id: meal_id }).first();

  if (!meal) {
    throw new AppError("Dish does not exist.");
  }

  const updatedItem = {
    meal_id: meal_id ?? updatedSelect.meal_id,
    amount: amount ?? updatedSelect.amount,
    unit_price: unit_price ?? meal.price,
    total_price: (amount ?? updatedSelect.amount) * (unit_price ?? meal.price)
  };

  console.log("Updating item:", updatedItem);

  await knex("selected").where({ id }).update(updatedItem);

  return response.json();
}

  

  async delete(request, response) {
    const { id } = request.params;

    await knex("selected").where({ id }).delete();

    return response.json();
  }
}

module.exports = SelectedController;
