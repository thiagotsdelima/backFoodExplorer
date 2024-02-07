const { Router } = require('express');
const DrinkEatController = require("../controller/DrinkEatController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const drinkEatRoutes = Router();

const drinkEatController = new DrinkEatController();
drinkEatRoutes.use(verifyUserAuthorization("admin"));


drinkEatRoutes.post("/", drinkEatController.create);
drinkEatRoutes.delete("/:id", ensureAuthenticated, drinkEatController.delete);

module.exports = drinkEatRoutes;