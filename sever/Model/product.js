// models/ProductModel.js
import db from '../config/db.js';

export const insertProduct = (values, callback) => {
  const sql = `
    INSERT INTO product (
      name,
      seller_id,
      category,
      brand_id,
      price,
      discount_price,
      stock,
      quantity,
      status,
      description,
      images
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
  db.query(
    `SELECT product.*, brand.name AS brand_name 
     FROM product 
     JOIN brand ON product.brand_id = brand.id 
     WHERE product.category = ?`,
    [id],
    callback
  );
  
};

export const brandProduct = (id,callback) => {
  const sql = (`
    SELECT * FROM product WHERE brand_id = ?  
  `)
  db.query(sql,[id],callback);
}

export const updateProduct = (values, callback) => {
  const sql = `
    UPDATE product SET
      name = ?,
      seller_id = ?,
      category = ?,
      brand_id = ?,
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
