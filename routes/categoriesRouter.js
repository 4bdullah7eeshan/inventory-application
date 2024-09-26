const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getAllCategories);

categoriesRouter.get("/new", categoriesController.getNewCategory);

categoriesRouter.post("/new", categoriesController.createNewCategory);

categoriesRouter.get("/:id", categoriesController.getCategoryById);

categoriesRouter.get("/:id/edit", categoriesController.getUpdateCategory);

categoriesRouter.post("/:id/edit", categoriesController.updateCategory);

module.exports = categoriesRouter;