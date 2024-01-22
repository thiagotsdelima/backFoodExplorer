const knex = require("../database/knex");

class SeasoningController {
  async index(request, response) {
    const { meal_id } = request.params;

    const seasoning = await knex("seasoning")
      .where({ meal_id })
      .select("name")
      .groupBy("name");

    return response.json(seasoning);
  }
}

module.exports = SeasoningController;

