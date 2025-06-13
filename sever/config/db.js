// db.js
import mysql from 'mysql2';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'multi-store',
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
        id INT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category INT(20) NOT NULL,
        brand INT(20) NOT NULL,
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

//  Create Customer Table
const createCustomerTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS customers (
      id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
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
    if (err) {
      console.error('Error creating customers table:', err.message);
    } else {
      console.log('Customers table ready (if not already existing)');
    }
  });
};
createCustomerTable();

// Category Table
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

// Address Table
const AddressTable = () =>{
  const sql = `
  CREATE TABLE IF NOT EXISTS address (
      id INT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      address VARCHAR(255) NOT NULL,
      country VARCHAR(100) NOT NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      postal_code VARCHAR(20) NOT NULL,
      customer_id INT(20) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;
    db.query(sql, (err) => {
      if (err) {
        console.error('Error creating category table:', err.message);
      } else {
        console.log('Address table ready (if not already existing)');
      }
    });
  }

  AddressTable();

// Brand Table
const createBrandTable = () => {
  const sql = `
  CREATE TABLE IF NOT EXISTS brand (
      id INT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;
db.query(sql, (err) => {
  if (err) {
    console.error('Error creating Brand table:', err.message);
  } else {
    console.log('Brand table ready (if not already existing)');
  }
});
};
createBrandTable();

const Cart = () =>{
  const sql = `
  CREATE TABLE IF NOT EXISTS cart (
    id INT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id int(50) NOT NULL,
    name VARCHAR (255) NOT NULL,
    image VARCHAR (255) NOT NULL,
    quantity int(50) NOT NULL,
    price float(50) NOT NULL,
    customer_id int(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  db.query(sql, (err) => {
    if (err) {
      console.error('Error creating Brand table:', err.message);
    } else {
      console.log('cart table ready (if not already existing)');
    }
  });
}

Cart();


export default db;
