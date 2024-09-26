const { Router } = require("express");
const asmrtistsController = require("../controllers/asmrtistsController");

const asmrtistsRouter = Router();

asmrtistsRouter.get("/", asmrtistsController.getAllAsmrtists);

module.exports = asmrtistsRouter;