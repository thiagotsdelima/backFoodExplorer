const { Router } = require('express');
const DrinkEatController = require("../controller/DrinkEatController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const drinkEatRoutes = Router();

const drinkEatController = new DrinkEatController();


drinkEatRoutes.use(ensureAuthenticated);


drinkEatRoutes.post("/", verifyUserAuthorization("admin"), drinkEatController.create);
drinkEatRoutes.delete("/:id", verifyUserAuthorization("admin"), drinkEatController.delete);



module.exports = drinkEatRoutes;
