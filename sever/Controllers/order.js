import {
    insertOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    insertOrderProduct,
    getOrderProducts
  } from '../Model/order.js';
 
  // Create order along with order products
  export const createOrder = (req, res) => {
    const { orderData, orderProducts } = req.body;
    console.log(req.body);
    
    // Step 1: Insert order
    insertOrder(orderData, (err, result) => {
      if (err) return res.status(500).json({ error: "DB error", details: err });
  
      const orderId = result.insertId;
  
      // Step 2: Insert order products
      const productPromises = orderProducts.map(
        (product) =>
          new Promise((resolve, reject) => {
            insertOrderProduct({ ...product, order_id: orderId }, (err, res) => {
              if (err) reject(err);
              else resolve(res);
            });
          })
      );
  
      Promise.all(productPromises)
        .then(() => {
          res.status(201).json({
            status: "success",
            orderId,
            message: "Order and products created successfully",
          });
        })
        .catch((err) => {
          res.status(500).json({ error: "Error inserting order products", details: err });
        });
    });
  };
  
  // List all orders
  export const listOrders = (req, res) => {
    getAllOrders((err, results) => {    
      if (err) return res.status(500).json({ error: "DB error", details: err });
      res.json(results);
    });
  };
  
  // Get order by ID
  export const getOrder = (req, res) => {
    const { id } = req.params;
    getOrderById(id, (err, results) => {
      if (err) return res.status(500).json({ error: "DB error", details: err });
      if (results.length === 0) return res.status(404).json({ error: "Order not found" });
      res.json(results[0]);
    });
  };
  
  // Update order
  export const editOrder = (req, res) => {
    const { id } = req.params;
    updateOrder(id, req.body, (err, result) => {
      if (err) return res.status(500).json({ error: "DB error", details: err });
      res.json({ status: "success", message: "Order updated successfully" });
    });
  };
  
  // Delete order
  export const removeOrder = (req, res) => {
    const { id } = req.params;
    deleteOrder(id, (err, result) => {
      if (err) return res.status(500).json({ error: "DB error", details: err });
      res.json({ status: "success", message: "Order deleted successfully" });
    });
  };
  
 
  // List order products by order_id
  export const listOrderProducts = (req, res) => {
    const { order_id } = req.params;
    getOrderProducts(order_id, (err, results) => {
      if (err) return res.status(500).json({ error: "DB error", details: err });
      res.json(results);
    });
  };
  