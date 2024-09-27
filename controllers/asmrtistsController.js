const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const getAllAsmrtists = asyncHandler(async (req, res) => {
    const asmrtists = await db.getAllAsmrtists();
    res.render("pages/asmrtists", { title: "All ASMRtists", asmrtists: asmrtists });
});

const getNewAsmrtist = asyncHandler(async (req, res) => {
    res.render("pages/newASMRtist", { title: "New ASMRtist" });
});

const createNewASMRtist = asyncHandler(async (req, res) => {
    const { name, yt_channel } = req.body;
    console.log(req.body);
    await db.insertNewAsmrtist({ name: name, yt_channel: yt_channel });
    res.redirect("/asmrtists");
});

const getASMRtistById = asyncHandler(async (req, res) => {
    const asmrtistId = parseInt(req.params.id, 10); 
    const asmrtist = await db.getAsmrtistById(asmrtistId);
    const categories = await db.getCategoriesByAsmrtist(asmrtistId);

    res.render("pages/asmrtist", { title: asmrtist.name, asmrtist, categories });

});

const getUpdateASMRtist = asyncHandler(async (req, res) => {
    const asmrtistId = parseInt(req.params.id, 10);
    const asmrtist = await db.getAsmrtistById(asmrtistId);
    const associatedCategories = await db.getCategoriesByAsmrtist(asmrtistId); 
    const allCategories = await db.getAllCategories(); 
    res.render("pages/editASMRtist", { 
        title: "Edit " + asmrtist.name, 
        asmrtist, 
        associatedCategories, 
        allCategories 
    });
});

const updateASMRtist = asyncHandler(async (req, res) => {
    const asmrtistId = parseInt(req.params.id, 10);
    const { name, yt_channel } = req.body;
    let selectedCategories = req.body.selectedCategories;

    if (!Array.isArray(selectedCategories)) {
        selectedCategories = selectedCategories ? [selectedCategories] : [];
    }
 
    await db.updateAsmrtist(asmrtistId, { name, yt_channel });
    await db.updateAsmrtistCategories(asmrtistId, selectedCategories);

    res.redirect(`/asmrtists/${asmrtistId}`);
});

const deleteAsmrtist = asyncHandler(async (req, res) => {
    const asmrtistId = parseInt(req.params.id, 10); 
    await db.deleteAsmrtist(asmrtistId);
    res.redirect("/asmrtists");
});


module.exports = {
    getAllAsmrtists,
    getNewAsmrtist,
    createNewASMRtist,
    getASMRtistById,
    getUpdateASMRtist,
    updateASMRtist,
    deleteAsmrtist,
};