const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getAllCategories);

categoriesRouter.get("/new", categoriesController.getNewCategory);

categoriesRouter.post("/new", categoriesController.createNewCategory);

module.exports = categoriesRouter;