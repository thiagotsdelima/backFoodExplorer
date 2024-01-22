const { Router } = require('express');
const MixtureController = require("../controller/MixtureController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const mixtureRoutes = Router();
const mixtureController = new MixtureController();

mixtureRoutes.use(ensureAuthenticated);


mixtureRoutes.post("/", mixtureController.create);
mixtureRoutes.get("/", mixtureController.index);
mixtureRoutes.get("/:user_id", mixtureController.show);
mixtureRoutes.delete("/:id", mixtureController.delete);

module.exports = mixtureRoutes;
