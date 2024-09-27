const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
require('dotenv').config();

const adminPassword = process.env.ADMIN_PASSWORD;

const getAllAsmrtists = asyncHandler(async (req, res) => {
    const asmrtists = await db.getAllAsmrtists();
    res.render("pages/asmrtists", { title: "All ASMRtists", asmrtists: asmrtists });
});

const getNewAsmrtist = asyncHandler(async (req, res) => {
    const allCategories = await db.getAllCategories();
    res.render("pages/newASMRtist", { title: "New ASMRtist", allCategories });
});

const createNewASMRtist = asyncHandler(async (req, res) => {
    const { name, yt_channel, selectedCategories } = req.body;
    console.log(req.body);
    const newAsmrtist = await db.insertNewAsmrtist({ name: name, yt_channel: yt_channel });
    
    if (selectedCategories && selectedCategories.length > 0) {
        const categoriesIds = Array.isArray(selectedCategories) ? selectedCategories : [selectedCategories];
        const associationPromises = categoriesIds.map(categoryId => {
            return db.associateAsmrtistWithCategory(categoryId, newAsmrtist.id);
        });

        await Promise.all(associationPromises);
    }

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
        title: `Edit "${asmrtist.name}" ASMRtist`, 
        asmrtist, 
        associatedCategories, 
        allCategories 
    });
});

const updateASMRtist = asyncHandler(async (req, res) => {
    const asmrtistId = parseInt(req.params.id, 10);
    const { name, yt_channel, adminPasswordInput } = req.body;

    const asmrtist = await db.getAsmrtistById(asmrtistId);

    if (asmrtist.protected) {
        if (adminPasswordInput !== adminPassword) {
            return res.status(403).send('Admin password required for editing protected asmrtists');
        }
    }

    let selectedCategories = req.body.selectedCategories;

    if (!Array.isArray(selectedCategories)) {
        selectedCategories = selectedCategories ? [selectedCategories] : [];
    }
 
    await db.updateAsmrtist(asmrtistId, { name, yt_channel });
    await db.updateAsmrtistCategories(asmrtistId, selectedCategories);

    res.redirect(`/asmrtists/${asmrtistId}`);
});

const getDeleteAsmrtist = asyncHandler(async (req, res) => {
    const asmrtistId = parseInt(req.params.id, 10);
    const asmrtist = await db.getAsmrtistById(asmrtistId);
    const categories = await db.getCategoriesByAsmrtist(asmrtistId);

    res.render("pages/deleteASMRtist", { title: `Delete "${asmrtist.name}" ASMRtist?`, asmrtist: asmrtist, categories});

})

const deleteAsmrtist = asyncHandler(async (req, res) => {
    const asmrtistId = parseInt(req.params.id, 10); 
    const { adminPasswordInput } = req.body;

    const asmrtist = await db.getAsmrtistById(asmrtistId);

    if (asmrtist.protected) {
        if (adminPasswordInput !== adminPassword) {
            return res.status(403).send('Admin password required for deleting protected asmrtists');
        }
    }

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
    getDeleteAsmrtist,
};