const knex = require("../database/knex");

class DrinkEatController {
    async create(request, response) {
        const { name } = request.body;
       

        await knex("drinkEat").insert({ name });

        return response.json();
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("drinkEat").where({ id }).delete();

        return response.json();
    }
}

module.exports = DrinkEatController;