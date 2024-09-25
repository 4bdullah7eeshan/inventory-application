const { Router } = require("express");
const homePageController = require("../controllers/homePageController");

const indexRouter = Router();

indexRouter.get("/", homePageController.getHomePage);

module.exports = indexRouter;