import express from "express";

import {
    getCartById,
    // getCarts,
    // updateCartById,
    // deleteCartById,
    addCart,
} from '../Controllers/cart.js';

const router = express.Router();

// router.get('/getcart', getCarts);
router.get('/getcart/:id', getCartById);
router.post('/add-cart', addCart);
// router.put('/cart/:id', updateCartById);
// router.delete('/cart/:id', deleteCartById);

export default router