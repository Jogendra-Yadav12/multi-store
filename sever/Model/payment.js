import db from "../config/db.js";

// Insert Payment with custom_fields
export const insertPayment = (data, callback) => {
  const { name, status, custom_fields } = data;

  db.query(
    "INSERT INTO payments (name, status, custom_fields) VALUES (?, ?, ?)",
    [name, status, JSON.stringify(custom_fields || [])],
    callback
  );
};

// Get all Payments
export const getAllPayments = (callback) => {
  db.query("SELECT * FROM payments", callback);
};

// Get Payment by ID
export const getPaymentsById = (id, callback) => {
  db.query("SELECT * FROM payments WHERE id = ?", [id], callback);
};

// Update Payment
export const updatePayment = (id, data, callback) => {
  const { name, status, custom_fields } = data;

  db.query(
    "UPDATE payments SET name = ?, status = ?, custom_fields = ? WHERE id = ?",
    [name, status, JSON.stringify(custom_fields || []), id],
    callback
  );
};

// Delete Payment
export const deletePayment = (id, callback) => {
  db.query("DELETE FROM payments WHERE id = ?", [id], callback);
};
