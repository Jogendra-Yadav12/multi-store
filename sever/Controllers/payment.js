import {
    insertPayment,
    getAllPayments,
    getPaymentsById,
    updatePayment,
    deletePayment
  } from "../Model/payment.js";
  
  //  Create Payment
  export const createPayment = (req, res) => {
    const values = req.body; // { name, status, custom_fields }
  
    insertPayment(values, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Database error", details: err });
      }
      res.status(201).json({
        status: "success",
        message: "Payment added successfully",
        paymentId: result.insertId,
      });
    });
  };
  
  //  Get all Payments
  export const getPayments = (req, res) => {
   
    getAllPayments((err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }
  
      // Parse JSON field for each row
      const parsedResults = results.map((row) => ({
        ...row,
        custom_fields: row.custom_fields ? JSON.parse(row.custom_fields) : [],
      }));
  
      res.json(parsedResults);
    });
  };
  
  //  Get Payment by ID
  export const getPaymentById = (req, res) => {
    const { id } = req.params;
  
    getPaymentsById(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Payment not found" });
      }
  
      const payment = results[0];
      payment.custom_fields = payment.custom_fields
        ? JSON.parse(payment.custom_fields)
        : [];
  
      res.json(payment);
    });
  };
  
  // Update Payment
  export const editPayment = (req, res) => {
    const { id } = req.params;
    const values = req.body;
  
    updatePayment(id, values, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }
      res.json({
        status: "success",
        message: "Payment updated successfully",
      });
    });
  };
  
  // Delete Payment
  export const removePayment = (req, res) => {
    const { id } = req.params;
  
    deletePayment(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err });
      }
      res.json({
        status: "success",
        message: "Payment deleted successfully",
      });
    });
  };
  