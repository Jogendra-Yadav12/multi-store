import bcrypt from 'bcrypt';
import {
  insertCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from '../Model/customers.js';


const SALT_ROUNDS = 10;

// Add Customer
export const addCustomer = async (req, res) => {
  const { f_name, l_name, email, password, number } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const values = [f_name, l_name, image, email, hashedPassword, number];

    insertCustomer(values, (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({
        status: 'success',
        message: 'Customer added successfully',
        customerId: result.insertId
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Password hashing failed', details: error.message });
  }
};

// Get All Customers
export const getCustomers = (req, res) => {
  getAllCustomers((err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// Get Single Customer by ID
export const getCustomer = (req, res) => {
  const { id } = req.params;
  getCustomerById(id, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'Customer not found' });
    res.json(results[0]);
  });
};

// Update Customer
export const updateCustomerById = async (req, res) => {
  const { id } = req.params;
  const { f_name, l_name, email, password, number, image: existingImage } = req.body;

  const image = req.file ? req.file.filename : existingImage;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const values = [f_name, l_name, image, email, hashedPassword, number, id];

    updateCustomer(values, (err) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ message: 'Customer updated successfully' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Password hashing failed', details: error.message });
  }
};

// Delete Customer
export const deleteCustomerById = (req, res) => {
  const { id } = req.params;
  deleteCustomer(id, (err) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ message: 'Customer deleted successfully' });
  });
};
