import express from "express";

import {
    clearCart,
    getCartById,
    updateCartById,
    deleteCartById,
    addCart,
} from '../Controllers/cart.js';

const router = express.Router();

router.get('/getcart/:id', getCartById);
router.post('/add-cart', addCart);
router.put('/updateCart/:cart_id/', updateCartById);
router.delete('/deleteCart/:id/', deleteCartById);
router.delete("/clear-cart/:userId", clearCart);

export default router