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
    const { rows } = await pool.query("INSERT INTO categories (name, description, image) VALUES ($1, $2, $3) RETURNING *", [name, description, image]);
    return rows[0];
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

// Association Stuff

async function getAsmrtistsByCategory(categoryId) {
    const { rows } = await pool.query(
        `SELECT asmrtists.id, asmrtists.name, asmrtists.yt_channel 
         FROM asmrtists
         JOIN category_asmrtists ON asmrtists.id = category_asmrtists.asmrtist_id
         WHERE category_asmrtists.category_id = $1`,
        [categoryId]
    );
    return rows;
}

async function getCategoriesByAsmrtist(asmrtistId) {
    const { rows } = await pool.query(
        `SELECT categories.id, categories.name, categories.description, categories.image
         FROM categories
         JOIN category_asmrtists ON categories.id = category_asmrtists.category_id
         WHERE category_asmrtists.asmrtist_id = $1`,
        [asmrtistId]
    );
    return rows;
}

async function associateAsmrtistWithCategory(categoryId, asmrtistId) {
    await pool.query(
        "INSERT INTO category_asmrtists (category_id, asmrtist_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
        [categoryId, asmrtistId]
    );
}

async function removeAsmrtistFromCategory(categoryId, asmrtistId) {
    await pool.query(
        "DELETE FROM category_asmrtists WHERE category_id = $1 AND asmrtist_id = $2",
        [categoryId, asmrtistId]
    );
}

const updateCategoryAsmrtists = async (categoryId, asmrtists) => {
    await pool.query("DELETE FROM category_asmrtists WHERE category_id = $1", [categoryId]);

    for (let asmrtistId of asmrtists) {
        await pool.query("INSERT INTO category_asmrtists (category_id, asmrtist_id) VALUES ($1, $2)", [categoryId, asmrtistId]);
    }
};

const updateAsmrtistCategories = async (asmrtistId, categories) => {
    await pool.query("DELETE FROM category_asmrtists WHERE asmrtist_id = $1", [asmrtistId]);

    for (let categoryId of categories) {
        await pool.query("INSERT INTO category_asmrtists (asmrtist_id, category_id) VALUES ($1, $2)", [asmrtistId, categoryId]);
    }
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
    deleteAsmrtist,
    getAsmrtistsByCategory,
    getCategoriesByAsmrtist,
    associateAsmrtistWithCategory,
    removeAsmrtistFromCategory,
    updateCategoryAsmrtists,
    updateAsmrtistCategories

};