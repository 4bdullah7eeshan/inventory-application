const express = require("express");
const path = require("node:path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/indexRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const asmrtistsRouter = require("./routes/asmrtistsRouter");

const app = express();
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(bodyParser.json());

app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/categories", categoriesRouter);
app.use("/asmrtists", asmrtistsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Inventory App running on port ${PORT}!`)
);
