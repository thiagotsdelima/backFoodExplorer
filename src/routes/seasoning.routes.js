const { Router } = require('express');
const SeasoningController = require("../controller/SeasoningController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const seasoningRoutes = Router();

const seasoningController = new SeasoningController();
seasoningRoutes.use(ensureAuthenticated);

seasoningRoutes.get("/:meal_id", seasoningController.index);

module.exports = seasoningRoutes;
