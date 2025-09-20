// db.js
import mysql from 'mysql2';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'multi_store',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Product Table
const createProductTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS product (
      id INT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      seller_id INT(20) UNSIGNED NOT NULL,
      name VARCHAR(255) NOT NULL,
      category INT(20) UNSIGNED NOT NULL,
      brand_id INT(20) UNSIGNED NOT NULL,
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
    if (err) console.error('Error creating Product table:', err.message);
    else console.log('Product table ready (if not already existing)');
  });
};
createProductTable();

// Customer Table
const createCustomerTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS customers (
      id INT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      f_name VARCHAR(100) NOT NULL,
      l_name VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      number VARCHAR(20) NOT NULL,
      user_type VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  db.query(sql, (err) => {
    if (err) console.error('Error creating customers table:', err.message);
    else console.log('Customers table ready (if not already existing)');
  });
};
createCustomerTable();

// Category Table
const createCategoryTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS category (
      id INT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(225) NOT NULL,
      meta_title VARCHAR(225) NOT NULL,
      meta_desc VARCHAR(225) NOT NULL,
      parent_id INT(20) UNSIGNED NOT NULL DEFAULT 0,
      slug VARCHAR(225) NOT NULL,
      image VARCHAR(500) NOT NULL,
      description VARCHAR(500) NOT NULL,
      status INT(5) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  db.query(sql, (err) => {
    if (err) console.error('Error creating category table:', err.message);
    else console.log('Category table ready (if not already existing)');
  });
};
createCategoryTable();

// Address Table
const AddressTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS address (
      id INT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      address VARCHAR(255) NOT NULL,
      shop_name VARCHAR(255) NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      country VARCHAR(100) NOT NULL,
      postal_code VARCHAR(20) NOT NULL,
      bank_details VARCHAR(255) NULL,
      ifsc_code VARCHAR(50) NULL,
      customer_id INT(20) UNSIGNED NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  db.query(sql, (err) => {
    if (err) console.error('Error creating address table:', err.message);
    else console.log('Address table ready (if not already existing)');
  });
};
AddressTable();

// Brand Table
const createBrandTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS brand (
      id INT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      status INT(5) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  db.query(sql, (err) => {
    if (err) console.error('Error creating Brand table:', err.message);
    else console.log('Brand table ready (if not already existing)');
  });
};
createBrandTable();

// Cart Table
const Cart = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS cart (
      id INT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      product_id INT(20) UNSIGNED NOT NULL,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      quantity INT(50) NOT NULL,
      price FLOAT(50) NOT NULL,
      customer_id INT(20) UNSIGNED NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  db.query(sql, (err) => {
    if (err) console.error('Error creating Cart table:', err.message);
    else console.log('Cart table ready (if not already existing)');
  });
};
Cart();

// Payments Table
const createPaymentsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS payments (
      id INT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      status TINYINT(1) DEFAULT 1,
      custom_fields JSON NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  db.query(sql, (err) => {
    if (err) console.error('Error creating Payment table:', err.message);
    else console.log('Payment table ready (if not already existing)');
  });
};
createPaymentsTable();

// Orders Table
const createOrdersTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS orders (
      id INT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      customer_id INT(20) UNSIGNED NOT NULL,
      shipping_id INT(20) UNSIGNED NOT NULL,
      payment_id INT(20) UNSIGNED NOT NULL,
      subtotal DECIMAL(10,2) NOT NULL,
      total DECIMAL(10,2) NOT NULL,
      platform_fee DECIMAL(10,2) DEFAULT 0,
      delivery_charge DECIMAL(10,2) DEFAULT 0,
      status VARCHAR(50) DEFAULT 'Pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  db.query(sql, (err) => {
    if (err) console.error('Error creating Order table:', err.message);
    else console.log('Order table ready (if not already existing)');
  });
};
createOrdersTable();

//Order Product Table
const createOrderProductTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS order_product (
      id INT(20) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      order_id INT(20) UNSIGNED NOT NULL,
      product_id INT(20) UNSIGNED NOT NULL,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      quantity INT(50) NOT NULL,
      price FLOAT(50) NOT NULL,      
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  db.query(sql, (err) => {
    if (err) console.error('Error creating Order Product table:', err.message);
    else console.log('Order Product table ready (if not already existing)');
  });
};
createOrderProductTable();

export default db;
