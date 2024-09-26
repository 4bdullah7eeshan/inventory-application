const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const getAllAsmrtists = asyncHandler(async (req, res) => {
    const asmrtists = await db.getAllAsmrtists();
    res.render("pages/asmrtists", { title: "All ASMRtists", asmrtists: asmrtists });
});

const getNewAsmrtist = asyncHandler(async (req, res) => {
    res.render("pages/newASMRtist", { title: "New ASMRtist" });
});


module.exports = {
    getAllAsmrtists,
    getNewAsmrtist,
    
};