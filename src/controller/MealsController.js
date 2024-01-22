const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class MealsController {
        async create(request, response) {
            const { name, description, price, category_name, seasoning } = request.body;
        
            
            const examineDish = await knex("meals").where({ name });
            if (examineDish.length > 0) {
                throw new AppError("This meal already exists.", 401);
            }
        
            
            const found = await knex("drinkEat").where({ name: category_name }).first();
            if (!found) {
                throw new AppError("This category does not exist", 401);
            }
        
        
            const [meal_id] = await knex("meals").insert({
                name,
                description,
                price,
                category_id: found.id,
            });
        
            
            if (seasoning && seasoning.trim().length > 0) {
                const seasoningArray = seasoning.split(","); 
                const seasoningInserts = seasoningArray.map(singleSeasoning => {
                    return {
                        meal_id: meal_id, 
                        name: singleSeasoning.trim()
                    };
                });
            
                await knex("seasoning").insert(seasoningInserts);
            }
        
            return response.json();
        }
    
        async update(request, response) { 
            const { id } = request.params;
            const { name, description, price, category_name, seasoning } = request.body;
          
            const meal = await knex("meals").where({ id }).first();
            const found = await knex("drinkEat").where({ name: category_name }).first();
        
            if (!meal) {
              throw new AppError("This meal does not exist.", 404);
            }
        
            await knex("meals").where({ id: meal.id }).update({
              name: name ?? meal.name,
              description: description ?? meal.description,
              price: price ?? meal.price,
              category_id: found ? found.id : meal.category_id,
            });
        
            if (seasoning) {
                await knex("seasoning").where({ meal_id: meal.id }).delete();
        
                const seasoningArray = Array.isArray(seasoning) ? seasoning : seasoning.split(",");
            
                for (const singleSeasoning of seasoningArray) {
                    await knex("seasoning").insert({
                        meal_id: meal.id,
                        name: singleSeasoning.trim()
                    });
                }
            }
        
            return response.status(201).json();
        }
        
        async show(request, response) {
            const { id } = request.params;
        
            const meal = await knex("meals").where({ id }).first();
            const seasonings = await knex("seasoning").where({ meal_id: id }).orderBy("name");
        
            if (!meal) {
                throw new AppError("This meal does not exist", 404);
            }
        
            return response.json({
                ...meal,
                seasonings
            });
        }        

        async index(request, response) {
            const { seasoningQuery, meal } = request.query;
        
            let meals;
        
            if (seasoningQuery) {
                const filterSeasoning = seasoningQuery.split(',').map(seasoning => seasoning.trim());
                const allSeasonings = await knex("seasoning").select("*");
                const seasoningNames = allSeasonings.map(item => item.name);
        
                const checkSeasoning = filterSeasoning.every(seasoning => seasoningNames.includes(seasoning));
        
                if (checkSeasoning) {
                    meals = await knex("seasoning")
                        .select([
                            "meals.id",
                            "meals.name",
                            "meals.description",
                            "meals.price",
                            "meals.category_id",
                        ])
                        .whereIn("seasoning.name", filterSeasoning)
                        .innerJoin("meals", "meals.id", "seasoning.meal_id")
                        .orderBy("meals.name");
                } else {
                    meals = await knex("meals").select("*");
                }
            } else if (meal) {
                meals = await knex("meals").select("*")
                    .whereLike("name", `%${meal}%`)
                    .orderBy("price");
            } else {
                meals = await knex("meals").select("*");
            }
        
            const mealsWithSeasoning = await Promise.all(meals.map(async meal => {
                const mealSeasonings = await knex("seasoning").where({ meal_id: meal.id });
                return {
                    ...meal,
                    seasonings: mealSeasonings
                };
            }));
        
            return response.json(mealsWithSeasoning);
        }
        
        async delete(request, response) {
                const { id } = request.params;
        
                const deleted = await knex("meals").where({ id }).delete();
        
                if(!deleted) {
                    throw new AppError("This meal does not exist.", 404)
                }
        
                response.status(204).send();
        }
    
    }
    
    module.exports = MealsController;
