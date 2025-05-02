// models/categoryModel.js
import db from '../config/db.js';

const createCategoryTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS category (
      id INT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(225) NOT NULL,
      meta_title VARCHAR(225) NOT NULL,
      meta_desc VARCHAR(225) NOT NULL,
      parent_id INT(20) NOT NULL DEFAULT 0,
      slug VARCHAR(225) NOT NULL,
      image VARCHAR(500) NOT NULL,
      description VARCHAR(500) NOT NULL,
      status INT(5) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  db.query(sql, (err) => {
    if (err) {
      console.error('Error creating category table:', err.message);
    } else {
      console.log('Category table ready (if not already existing)');
    }
  });
};
createCategoryTable();


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
    UPDATE category SET name = ?, slug = ?, parent_id = ?, image = ?, description = ?, status = ? 
    WHERE id = ?
  `;
  db.query(sql, values, callback);
};

export const deleteCategory = (id, callback) => {
  db.query('DELETE FROM category WHERE id = ?', [id], callback);
};
