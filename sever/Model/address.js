import db from '../config/db.js';

const AddressTable = () =>{
    const sql = `
    CREATE TABLE IF NOT EXISTS address (
        id INT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        address VARCHAR(255) NOT NULL,
        country VARCHAR(100) NOT NULL,
        city_state VARCHAR(100) NOT NULL,
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