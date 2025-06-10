import db from '../config/db.js';

export const insertAddress = (values, callback) => {
    const sql = `
      INSERT INTO address (
        address, country, city, state, postal_code, customer_id
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, values, callback);
  };

  export const getAllAddress = (callback) => {
    db.query("SELECT * FROM address", callback);
  };
  
  export const getAddress = (id, callback) => {
    db.query("SELECT * FROM address WHERE id = ?", [id], callback);
  };
  
  export const deleteAddress = (id, callback) => {
    db.query("DELETE FROM address WHERE id = ?", [id], callback);
  };

  export const getAddressByCustomer = (customer_id, callback) => {
    const sql = "SELECT * FROM address WHERE customer_id = ?";
    db.query(sql, [customer_id], callback);
  };
  

export const updateAddress = (values, callback) => {
    const sql = `
      UPDATE address SET
        address = ?, country = ?, city = ?, state = ?, postal_code = ?
      WHERE id = ?
    `;
    db.query(sql, values, callback);
  };