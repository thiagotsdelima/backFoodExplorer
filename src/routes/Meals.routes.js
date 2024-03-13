const { Router } = require('express');
const MealsController = require("../controller/MealsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const mealImageController = require("../controller/MealImageController");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");
const uploadConfig = require("../configs/upload");
const multer = require("multer");

const upload = multer(uploadConfig.MULTER);
const mealsRoutes = Router();

const mealsController = new MealsController();
const mealImageController = new MealImageController();

mealsRoutes.use(ensureAuthenticated);
mealsRoutes.post("/", verifyUserAuthorization("admin"), upload.single("photo_food"), mealsController.create);
mealsRoutes.put("/:id", verifyUserAuthorization("admin"), upload.single("photo_food"), mealsController.update);
mealsRoutes.delete("/:id", verifyUserAuthorization("admin"), mealsController.delete);
mealsRoutes.get("/:id", mealsController.show);
mealsRoutes.get("/", mealsController.index);
mealsRoutes.delete("/files/:filename", verifyUserAuthorization("admin"), mealImageController.delete);
module.exports = mealsRoutes;
