const { Router } = require('express');
const UsersController = require("../controller/UsersController");
const UserValidatedController = require("../controller/UserValidatedController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();

const usersController = new UsersController();
const userValidatedController = new UserValidatedController();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/validated", ensureAuthenticated, userValidatedController.index);
usersRoutes.put("/", ensureAuthenticated, usersController.update);

module.exports = usersRoutes;