const { Router } = require('express');
const SelectedController = require("../controller/SelectedController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const selectedRoutes = Router();

const selectedController = new SelectedController();
selectedRoutes.use(ensureAuthenticated);

selectedRoutes.post("/", selectedController.create);
selectedRoutes.put("/:id", selectedController.update);
selectedRoutes.delete("/:id", selectedController.delete);

module.exports = selectedRoutes;