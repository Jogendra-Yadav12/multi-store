import db from '../config/db.js';

// Get customer by email
export const getCustomerByEmail = (email, callback) => {
  const query = "SELECT * FROM customers WHERE email = ? AND user_type IN ('A', 'S')";
  db.query(query, [email], callback);
};

// Get customer by email
export const getCustomerLoginByEmail = (email, callback) => {
  const query = "SELECT * FROM customers WHERE email = ? AND user_type IN ('C')";
  db.query(query, [email], callback);
};

// Add Customer
export const insertCustomer = (values, callback) => {
  const sql = `
    INSERT INTO customers (f_name, l_name, email, password, number,user_type)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, values, callback);
};

// Get All Customers
export const getAllCustomers = (callback) => {
  db.query('SELECT * FROM customers', callback);
};

// Get One Customer
export const getCustomerById = (id, callback) => {
  db.query('SELECT * FROM customers WHERE id = ?', [id], callback);
};

// Update Customer
export const updateCustomer = (values, callback) => {
  // console.log(values);
  
  const sql = `
    UPDATE customers 
    SET f_name = ?, l_name = ?, email = ?, number = ?,user_type=?
    WHERE id = ?
  `;
 db.query(sql, values, callback);
};

// Delete Customer
export const deleteCustomer = (id, callback) => {
  db.query('DELETE FROM customers WHERE id = ?', [id], callback);
};
