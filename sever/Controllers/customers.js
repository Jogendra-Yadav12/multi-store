import bcrypt from 'bcrypt';
import {
  insertCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerByEmail,
  getCustomerLoginByEmail 
} from '../Model/customers.js';

const SALT_ROUNDS = 10;

export const loginFrontend = async (req, res) => {
  const { email, password } = req.body;

  getCustomerLoginByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

    const customer = results[0];

    try {
      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Exclude password from the response
      const { password: _, ...userWithoutPassword } = customer;

      res.status(200).json({
        success: true,
        message: 'Login successful',
        token: 'some-jwt-token',
        user: userWithoutPassword
      });

    } catch (error) {
      res.status(500).json({ error: 'Password comparison failed', details: error.message });
    }
  });
};

export const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  getCustomerByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

    const customer = results[0];

    try {
      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Exclude password from the response
      const { password: _, ...userWithoutPassword } = customer;

      res.status(200).json({
        success: true,
        message: 'Login successful',
        token: 'some-jwt-token',
        user: userWithoutPassword
      });

    } catch (error) {
      res.status(500).json({ error: 'Password comparison failed', details: error.message });
    }
  });
};


// Add Customer
export const addCustomer = async (req, res) => {
  const { f_name, l_name, email, password, number, user_type } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const values = [f_name, l_name, email, hashedPassword, number,user_type];

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
  const { f_name, l_name, email, number,user_type} = req.body;

  try {
    const values = [f_name, l_name, email, number, user_type,id];

    updateCustomer(values, (err) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({
        success : true, 
        message: 'Customer updated successfully' });
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
