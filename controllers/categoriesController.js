const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await db.getAllCategories();
    res.render("pages/categories", { title: "All Categories", categories: categories });
});

const createNewCategory = asyncHandler(async (req, res) => {
    const { name, description, image } = req.body;
    await db.insertNewCategory({ name: name, description: description, image: image });
    res.redirect("/categories");
});

const getNewCategory = asyncHandler(async (req, res) => {
    res.render("pages/newCategory", { title: "New Category" });
});


module.exports = {
    getAllCategories,
    createNewCategory,
    getNewCategory,
};