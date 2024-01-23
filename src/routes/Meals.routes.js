const { Router } = require('express');
const MealsController = require("../controller/MealsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const uploadConfig  = require("../configs/upload");
const DiskStorage = require("../providers/DiskStorage");

const upload = multer(uploadConfig.MULTER);
const mealsRoutes = Router();

const mealsController = new MealsController();

mealsRoutes.post("/", ensureAuthenticated, upload.single("photo_food"), mealsController.create);
mealsRoutes.put("/:id", ensureAuthenticated, upload.single("photo_food"), mealsController.update);
mealsRoutes.get("/:id", ensureAuthenticated, mealsController.show);
mealsRoutes.get("/", mealsController.index);
mealsRoutes.delete("/:id", ensureAuthenticated, mealsController.delete);

module.exports = mealsRoutes;