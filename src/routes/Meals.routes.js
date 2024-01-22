const { Router } = require('express');
const MealsController = require("../controller/MealsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const mealsRoutes = Router();

const mealsController = new MealsController();

mealsRoutes.post("/", ensureAuthenticated, mealsController.create);
mealsRoutes.put("/:id", ensureAuthenticated, mealsController.update);
mealsRoutes.get("/:id", ensureAuthenticated, mealsController.show);
mealsRoutes.get("/", mealsController.index);
mealsRoutes.delete("/:id", ensureAuthenticated, mealsController.delete);

module.exports = mealsRoutes;