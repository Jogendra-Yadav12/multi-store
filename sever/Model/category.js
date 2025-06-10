// models/categoryModel.js
import db from '../config/db.js';

export const getAllCategoriesWithSub = (callback) => {
  const sql = `SELECT id, name, parent_id FROM category ORDER BY name ASC`;
  db.query(sql, callback);
};


export const insertCategory = (values, callback) => {
  const sql = `
    INSERT INTO category (name, slug, parent_id, meta_title, meta_desc, image, description, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, values, callback);
};

export const getAllCategories = (callback) => {
  db.query('SELECT * FROM category', callback);
};

export const getCategoryById = (id, callback) => {
  db.query('SELECT * FROM category WHERE id = ?', [id], callback);
};

export const updateCategory = (values, callback) => {
  const sql = `
    UPDATE category SET name = ?,meta_title = ?, meta_desc = ?, slug = ?, parent_id = ?, image = ?, description = ?, status = ? 
    WHERE id = ?
  `;
  db.query(sql, values, callback);
};

export const deleteCategory = (id, callback) => {
  db.query('DELETE FROM category WHERE id = ?', [id], callback);
};
