const { Router } = require("express");

const usersRouter = require("./users.routes");
const mealsRouter = require("./Meals.routes");
const drinkEatRouter = require("./drinkEat.routes");
const mixtureRouter = require('./mixture.routes');
const seasoningRouter = require("./seasoning.routes");
const dishDetailsRouter = require("./dishDetails.routes");
const selectedRouter = require("./selected.routes");
const sessionsRouter = require('./sessions.routes');


const routes = Router();

routes.use("/users", usersRouter);
routes.use("/meals", mealsRouter);
routes.use("/drinkEat", drinkEatRouter);
routes.use("/mixture", mixtureRouter);
routes.use("/seasoning", seasoningRouter);
routes.use("/dishDetails", dishDetailsRouter);
routes.use("/selected", selectedRouter);
routes.use('/sessions', sessionsRouter);


module.exports = routes;