const knex = require("../database/knex");

class SeasoningController {
  async index(request, response) {
    const { meal_id } = request.params;

   
    const mealImage = await knex("meals")
      .where({ id: meal_id })
      .select("photo_food")
      .first();
    
    if (!mealImage) {
      return response.status(404).json({ message: "Meal not found" });
    }

    
    const seasonings = await knex("seasoning")
      .where({ meal_id })
      .select("name")
      .groupBy("name");

    return response.json({ photo_food: mealImage.photo_food, seasonings });
  }
}

module.exports = SeasoningController;
