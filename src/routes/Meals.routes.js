const { Router } = require('express');
const MealsController = require("../controller/MealsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");
const uploadConfig = require("../configs/upload");
const multer = require("multer");

const upload = multer(uploadConfig.MULTER);
const mealsRoutes = Router();

const mealsController = new MealsController();


mealsRoutes.use(ensureAuthenticated);
mealsRoutes.post("/", verifyUserAuthorization("admin"), upload.single("photo_food"), mealsController.create);
mealsRoutes.put("/:id", verifyUserAuthorization("admin"), upload.single("photo_food"), mealsController.update);
mealsRoutes.delete("/:id", verifyUserAuthorization("admin"), mealsController.delete);
mealsRoutes.get("/:id", verifyUserAuthorization(["customer", "admin"]), mealsController.show);
mealsRoutes.get("/", verifyUserAuthorization(["customer", "admin"]), mealsController.index);

module.exports = mealsRoutes;
