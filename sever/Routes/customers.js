import express from "express";

import {
    addCustomer,
    getCustomers,
    getCustomer,
    loginCustomer,
    updateCustomerById,
    deleteCustomerById
} from '../Controllers/customers.js';

const router = express.Router();

router.post('/admin', loginCustomer);
router.post('/add-customer', addCustomer);
router.get('/customers', getCustomers);
router.get('/customer/:id', getCustomer);
router.put('/customer/:id', updateCustomerById);
router.delete('/customer/:id', deleteCustomerById);

export default router;