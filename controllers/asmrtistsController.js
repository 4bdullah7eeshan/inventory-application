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
    res.render("pages/asmrtist", { title: asmrtist.name, asmrtist: asmrtist });
});

const getUpdateASMRtist = asyncHandler(async (req, res) => {
    const asmrtistId = parseInt(req.params.id, 10); 
    const asmrtist = await db.getAsmrtistById(asmrtistId);
    res.render("pages/editASMRtist", { title: "Edit" + asmrtist.name, asmrtist: asmrtist });
});



module.exports = {
    getAllAsmrtists,
    getNewAsmrtist,
    createNewASMRtist,
    getASMRtistById,
    getUpdateASMRtist,
    
};