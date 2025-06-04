// models/ProductModel.js
import db from '../config/db.js';

const createProductTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS product (
        id INT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category INT(20) NOT NULL,
        brand VARCHAR(255) NOT NULL,
        price FLOAT NOT NULL,
        discount_price FLOAT DEFAULT 0,
        stock INT NOT NULL,
        quantity INT NOT NULL,
        status INT(5) NOT NULL,
        description TEXT,
        images TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  db.query(sql, (err) => {
    if (err) {
      console.error('Error creating Product table:', err.message);
    } else {
      console.log('Product table ready (if not already existing)');
    }
  });
};
createProductTable();

export const insertProduct = (values, callback) => {
  const sql = `
    INSERT INTO product (
      name,
      category,
      brand,
      price,
      discount_price,
      stock,
      quantity,
      status,
      description,
      images
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, values, callback);
};

export const getAllProduct = (callback) => {
  db.query('SELECT * FROM product', callback);
};

export const getProductById = (id, callback) => {
  db.query('SELECT * FROM product WHERE id = ?', [id], callback);
};

export const getProductByCategoryById = (id, callback) => {
  db.query('SELECT * FROM product WHERE category = ?', [id], callback);
};

export const updateProduct = (values, callback) => {
  const sql = `
    UPDATE product SET
      name = ?,
      category = ?,
      brand = ?,
      price = ?,
      discount_price = ?,
      stock = ?,
      quantity = ?,
      status = ?,
      description = ?,
      images = ?
    WHERE id = ?
  `;
  db.query(sql, values, callback);
};

// In product.js model

export const getBestDeals = (callback) => {
  const sql = `
    SELECT *,
      ROUND(((price - discount_price) / price) * 100, 2) AS discount_percentage
    FROM product
    WHERE discount_price > 0 AND price > 0
    ORDER BY discount_percentage DESC
  `;
  db.query(sql, callback);
};



export const deleteProduct = (id, callback) => {
  db.query('DELETE FROM product WHERE id = ?', [id], callback);
};
