const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await db.getAllCategories();
    res.render("pages/categories", { title: "All Categories", categories: categories });
});

const getNewCategory = asyncHandler(async (req, res) => {
    res.render("pages/newCategory", { title: "New Category" });
});

const createNewCategory = asyncHandler(async (req, res) => {
    const { name, description, image } = req.body;
    console.log(req.body);
    console.log(name);
    console.log(description);
    console.log(image);
    await db.insertNewCategory({ name: name, description: description, image: image });
    res.redirect("/categories");
});

const getCategoryById = asyncHandler(async (req, res) => {
    const categoryId = parseInt(req.params.id, 10); 
    const category = await db.getCategoryById(categoryId);
    res.render("pages/category", { title: category.name, category: category });
});

const getUpdateCategory = asyncHandler(async (req, res) => {
    const categoryId = parseInt(req.params.id, 10); 
    const category = await db.getCategoryById(categoryId);
    res.render("pages/editCategory", { title: "Edit" + category.name, category: category });
});

const updateCategory = asyncHandler(async (req, res) => {
    const categoryId = parseInt(req.params.id, 10); 
    const { name, description, image } = req.body; 

    await db.updateCategory(categoryId, { name, description, image });
    res.redirect(`/categories/${categoryId}`);
});

const deleteCategory = asyncHandler(async (req, res) => {
    const categoryId = parseInt(req.params.id, 10); 
    await db.deleteCategory(categoryId);
    res.redirect("/categories");
});


module.exports = {
    getAllCategories,
    createNewCategory,
    getNewCategory,
    getCategoryById,
    updateCategory,
    getUpdateCategory,
    deleteCategory,
};