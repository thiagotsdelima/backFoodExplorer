const { Router } = require('express');
const DishDetailsController = require("../controller/DishDetailsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const dishDetailsRoutes = Router();

const dishDetailsController = new DishDetailsController();
dishDetailsRoutes.use(ensureAuthenticated);

dishDetailsRoutes.post("/", dishDetailsController.create);
dishDetailsRoutes.put("/:id", dishDetailsController.update);
dishDetailsRoutes.get("/:id", dishDetailsController.show);
dishDetailsRoutes.get("/", dishDetailsController.index);
dishDetailsRoutes.delete("/:id", dishDetailsController.delete);

module.exports = dishDetailsRoutes;