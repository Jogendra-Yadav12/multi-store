import express from "express";
const router = express.Router();

import {
  createPayment,
  getPayments,
  getPaymentById,
  editPayment,
  removePayment
} from "../Controllers/payment.js";

// Create a new payment
router.post("/add-payment", createPayment);

router.get("/getpayments", getPayments);

router.get("/getpayment/:id", getPaymentById);

router.put("/editpayment/:id", editPayment);
router.delete("/removepayment/:id", removePayment);


export default router;
