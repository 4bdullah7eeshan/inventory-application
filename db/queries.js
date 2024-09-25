const pool = require("./pool");

async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
};


async function getAllAsmrtists() {
    const { rows } = await pool.query("SELECT * FROM asmrtists");
    return rows;
};
  
async function insertNewCategory({ name, description, image }) {
    await pool.query("INSERT INTO categories (name, description, image) VALUES ($1, $2, $3)", [name, description, image]);
};

async function insertNewAsmrtist({ name, yt_channel }) {
    await pool.query("INSERT INTO asmrtists (name, yt_channel) VALUES ($1, $2)", [name, yt_channel]);
};
  
async function getCategoryById(id) {
    const res = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    return res.rows[0];
};


async function getAsmrtistById(id) {
    const res = await pool.query('SELECT * FROM asmrtists WHERE id = $1', [id]);
    return res.rows[0];
};

async function updateCategory(id, { name, description, image }) {
    const { rows } = await pool.query(
        "UPDATE categories SET name = $1, description = $2, image = $3 WHERE id = $4 RETURNING *",
        [name, description, image, id]
    );
};

async function updateAsmrtist(id, { name, yt_channel }) {
    const { rows } = await pool.query(
        "UPDATE asmrtists SET name = $1, yt_channel = $2 WHERE id = $3 RETURNING *",
        [name, yt_channel, id]
    );
    return rows[0];
};

async function deleteCategory(id) {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
};

async function deleteAsmrtist(id) {
    await pool.query('DELETE FROM asmrtists WHERE id = $1', [id]);
};

module.exports = {
    getAllCategories,
    getAllAsmrtists,
    insertNewCategory,
    insertNewAsmrtist,
    getCategoryById,
    getAsmrtistById,
    updateCategory,
    updateAsmrtist,
    deleteCategory,
    deleteAsmrtist
};