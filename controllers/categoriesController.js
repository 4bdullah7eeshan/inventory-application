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

const getCategoryById = asyncHandler(async (req, res) => {
    const categoryId = parseInt(req.params.id, 10); 
    const category = await db.getCategoryById(categoryId);
    res.render("pages/category", { title: category.name, category: category });
});

module.exports = {
    getAllCategories,
    createNewCategory,
    getNewCategory,
    getCategoryById
};