const { Router } = require("express");
const asmrtistsController = require("../controllers/asmrtistsController");

const asmrtistsRouter = Router();

asmrtistsRouter.get("/", asmrtistsController.getAllAsmrtists);

asmrtistsRouter.get("/new", asmrtistsController.getNewAsmrtist);

asmrtistsRouter.post("/new", asmrtistsController.createNewASMRtist);

module.exports = asmrtistsRouter;