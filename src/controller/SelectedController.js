const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class SelectedController {
  async create(request, response) {
    const { items, dishDetails_id } = request.body;

    await knex.transaction(async trx => {
        const itemsToInsert = await Promise.all(items.map(async item => {
            if (!item.meal_id) {
                throw new AppError("Meal ID is missing.");
            }

            const meal = await trx("meals").where({ id: item.meal_id }).first();

            if (!meal) {
                throw new AppError("Dish does not exist.");
            }

            return {
                amount: item.amount,
                dishDetails_id: dishDetails_id,  
                meal_id: meal.id,
                unit_price: item.unit_price,
            };
        }));

        await trx("selected").insert(itemsToInsert);
        await trx("dishDetails").where({ id: dishDetails_id }).del();
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
  
    updatedSelect.meal_id = meal_id ?? updatedSelect.meal_id;
    updatedSelect.amount = amount ?? updatedSelect.amount;
  
    await knex("selected").where({ id }).update({
      meal_id: updatedSelect.meal_id,
      amount: updatedSelect.amount,
      unit_price: unit_price ?? meal.price,
      total_price: updatedSelect.amount * (unit_price ?? meal.price)
    });
  
    return response.json();
  }
  

  async delete(request, response) {
    const { id } = request.params;

    await knex("selected").where({ id }).delete();

    return response.json();
  }
}

module.exports = SelectedController;
