import express from 'express';
import {
    getAddressById,
    getAddresss,
    updateAddressById,
    deleteAddressById,
    addAddress,
    getAddressByCustomerId
  } from '../Controllers/address.js';

const router = express.Router();

router.get('/getAddress', getAddresss);
router.get('/getAddress/:id', getAddressById);
router.post('/add-address', addAddress);
router.get('/cus_address/:customer_id', getAddressByCustomerId);
router.put('/address/:id', updateAddressById);
router.delete('/address/:id', deleteAddressById);

export default router;