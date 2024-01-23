const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const moment = require("moment-timezone");

class DishDetailsController {
  async create(request, response) {
    const user_id = request.user.id;

    const localTime = moment.tz(Date.now(), 'America/Fortaleza');
    const currentDateTime = localTime.format('DD/MM - HH:mm');

    if (!user_id) {
      throw new AppError("User not logged in.");
    }

    const [id] = await knex("dishDetails").insert({
      user_id,
      created_at: currentDateTime,
      updated_at: currentDateTime
    });

    return response.json({ id });
  }

  async show(request, response) {
    const user_id = request.user.id;

    const dishDetailsAll = await knex("dishDetails")
        .where("user_id", user_id)
        .select(["id", "created_at", "updated_at", "status"]);
       

    const dishesWithMeals = await Promise.all(dishDetailsAll.map(async detail => {
      
        const items = await knex("selected")
            .innerJoin("meals", "selected.meal_id", "meals.id")
            .where("selected.dishDetails_id", detail.id)
            .select([
                "meals.name as meal_name",
                "meals.photo_food",
                "selected.amount",
                "selected.unit_price",
                "selected.total_price"
            ]);
           
        return {
            ...detail,
            items
        };
    }));

    return response.json(dishesWithMeals);
  }

  async index(request, response) {
    const dishDetailsAll = await knex("dishDetails")
        .select(["id", "created_at", "updated_at", "status"]);
      
    const dishesWithMeals = await Promise.all(dishDetailsAll.map(async detail => {
      
        const items = await knex("selected")
            .innerJoin("meals", "selected.meal_id", "meals.id")
            .where("selected.dishDetails_id", detail.id)
            .select([
                "meals.name as meal_name",
                "meals.photo_food",
                "selected.amount",
                "selected.unit_price",
                "selected.total_price"
            ]);
            
        return {
            ...detail,
            items
        };
    }));

    return response.json(dishesWithMeals);
  }


  async update(request, response) {
    const { id } = request.params;
    const { status } = request.body;

    const menuExists = await knex("dishDetails").where({ id }).first();

    if (!menuExists) {
      throw new AppError("This menu does not exist.", 404)
    }

    await knex("dishDetails").where({ id }).update({
      status
    });

    return response.status(200).json();
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("dishDetails").where({ id }).delete();

    return response.json(id);
  }
}

module.exports = DishDetailsController;