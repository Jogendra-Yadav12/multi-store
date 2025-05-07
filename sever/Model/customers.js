import db from '../config/db.js';

// 🔨 Create Customer Table
const createCustomerTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS customers (
      id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      f_name VARCHAR(100) NOT NULL,
      l_name VARCHAR(100) NOT NULL,
      image VARCHAR(255) DEFAULT NULL,
      email VARCHAR(150) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      number VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  db.query(sql, (err) => {
    if (err) {
      console.error('Error creating customers table:', err.message);
    } else {
      console.log('Customers table ready (if not already existing)');
    }
  });
};
createCustomerTable();


// Get customer by email
export const getCustomerByEmail = (email, callback) => {
  const query = "SELECT * FROM customers WHERE email = ?";
  db.query(query, [email], callback);
};

// Add Customer
export const insertCustomer = (values, callback) => {
  const sql = `
    INSERT INTO customers (f_name, l_name, image, email, password, number)
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
  const sql = `
    UPDATE customers 
    SET f_name = ?, l_name = ?, image = ?, email = ?, password = ?, number = ?
    WHERE id = ?
  `;
  db.query(sql, values, callback);
};

// Delete Customer
export const deleteCustomer = (id, callback) => {
  db.query('DELETE FROM customers WHERE id = ?', [id], callback);
};
