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

router.get("/:id", getPaymentById);

router.put("/:id", editPayment);

router.delete("/:id", removePayment);

export default router;
