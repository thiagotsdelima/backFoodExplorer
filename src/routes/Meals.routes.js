const { Router } = require('express');
const MealsController = require("../controller/MealsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");
const uploadConfig  = require("../configs/upload");
const multer = require("multer");

const upload = multer(uploadConfig.MULTER);
const mealsRoutes = Router();

const mealsController = new MealsController();

mealsRoutes.post("/", verifyUserAuthorization("admin"), ensureAuthenticated, upload.single("photo_food"), mealsController.create);
mealsRoutes.put("/:id", verifyUserAuthorization("admin"), ensureAuthenticated, upload.single("photo_food"), mealsController.update);
mealsRoutes.get("/:id", verifyUserAuthorization(["customer", "admin"]), ensureAuthenticated, mealsController.show);
mealsRoutes.get("/", verifyUserAuthorization(["customer", "admin"]), mealsController.index);
mealsRoutes.delete("/:id", verifyUserAuthorization("admin"), ensureAuthenticated, mealsController.delete);

module.exports = mealsRoutes;