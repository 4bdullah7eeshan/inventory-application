const express = require('express');
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const methodOverride = require("method-override");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(methodOverride('_method'));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));



app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/categories", categoriesRouter);
app.use("categories/new", categoriesRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Mini Message Board app running on port ${PORT}!`));