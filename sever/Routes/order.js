import express from 'express';
const router = express.Router();

import {
  createOrder,
  listOrders,
  getOrder,
  editOrder,
  removeOrder,
  listOrderProducts
} from '../Controllers/order.js';

// Orders routes
router.post('add-order/', createOrder);
router.get('getorder/', listOrders);
router.get('getorder/:id', getOrder);
router.put('updateOrder/:id', editOrder);
router.delete('deleteOrder/:id', removeOrder);
router.get('/order-product/:order_id', listOrderProducts);

export default router;
