const { Router } = require('express');
const SeasoningController = require("../controller/SeasoningController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const seasoningRoutes = Router();
const seasoningController = new SeasoningController();


seasoningRoutes.use(ensureAuthenticated);
seasoningRoutes.get("/:meal_id", verifyUserAuthorization("customer"), seasoningController.index);

module.exports = seasoningRoutes;
