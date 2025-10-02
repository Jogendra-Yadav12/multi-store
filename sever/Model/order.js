import db from '../config/db.js';

// ===== Orders =====
export const insertOrder = (data, callback) => {
  const {
    customer_id,
    shipping_id,
    payment_id,
    subtotal,
    total,
    platform_fee,
    delivery_charge,
    status
  } = data;

  const sql = `
    INSERT INTO orders
      (customer_id, shipping_id, payment_id, subtotal, total, platform_fee, delivery_charge, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [customer_id, shipping_id, payment_id, subtotal, total, platform_fee, delivery_charge, status], callback);
};

export const getAllOrders = (callback) => {
  const sql = "SELECT * FROM orders";
  db.query(sql, callback);
};

export const getOrderById = (id, callback) => {
  const sql = "SELECT * FROM orders WHERE id = ?";
  db.query(sql, [id], callback);
};

export const updateOrder = (id, data, callback) => {
  const { status } = data;
  const sql = "UPDATE orders SET status = ? WHERE id = ?";
  db.query(sql, [status, id], callback);
};

export const deleteOrder = (id, callback) => {
  const sql = "DELETE FROM orders WHERE id = ?";
  db.query(sql, [id], callback);
};

// ===== Order Product =====
export const insertOrderProduct = (data, callback) => {
  const { order_id, product_id, name, image, quantity, price, customer_id } = data;
  const sql = `
    INSERT INTO order_product
      (order_id, product_id, name, image, quantity, price, customer_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [order_id, product_id, name, image, quantity, price, customer_id], callback);
};

export const getOrderProducts = (order_id, callback) => {
  const sql = "SELECT * FROM order_product WHERE order_id = ?";
  db.query(sql, [order_id], callback);
};
