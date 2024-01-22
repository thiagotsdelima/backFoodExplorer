const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MixtureController {
  async create(request, response) {
    const user_id = request.user.id;
    const { meal_id } = request.body;

    const userExists = await knex("users").where({ id: user_id }).first();

    if (!userExists) {
      throw new AppError("User not found.");
    }

    const [meal] = await knex("meals").where({ id: meal_id });

    if (!meal) {
      throw new AppError("This dish does not exist.");
    }

    await knex("mixture").insert({
      meal_id: meal.id,
      user_id,
    });

    return response.status(200).json();
  }

  async index(request, response) {
    const user_id = request.user.id;

    const mixture = await knex("mixture")
      .innerJoin("meals", "mixture.meal_id", "meals.id")
      .where("mixture.user_id", user_id)
      .select("meals.*")
      .groupBy("meal_id");

    return response.json(mixture);
  }

  async show(request, response) {
    const user_id = request.user.id;
    

    const mixture = await knex("mixture")
      .innerJoin("meals", "mixture.meal_id", "meals.id")
      .where("mixture.user_id", user_id)
      .select("meals.*")
      .groupBy("meal_id");

    if (!mixture) {
      throw new AppError("Favorite dish not found for this user.");
    }

    return response.json(mixture);
  }
  
  async delete(request, response) {
    const user_id = request.user.id;
    const { id } = request.params;

    await knex("mixture").where({ meal_id: id, user_id }).delete();

    return response.json();
}
}

module.exports = MixtureController;