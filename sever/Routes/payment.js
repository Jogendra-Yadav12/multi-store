import express from 'express';
const router = express.Router();

import {
    createPayment,
    getPayments,
    updatePayment,
    deletePayment    
} from '../Controllers/payment.js';

router.post("/", createPayment);
router.get("/", getPayments);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);