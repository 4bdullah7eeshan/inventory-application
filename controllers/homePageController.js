const asyncHandler = require("express-async-handler");

const getHomePage = asyncHandler(async (req, res) => {
    res.render("pages/index", { title: "ASMR Haven" });
});

module.exports = {
    getHomePage,
}