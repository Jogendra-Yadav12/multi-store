import express from "express";

import {
    getCartById,
    updateCartById,
    deleteCartById,
    addCart,
} from '../Controllers/cart.js';

const router = express.Router();

router.get('/getcart/:id', getCartById);
router.post('/add-cart', addCart);
router.put('/updateCart/:cart_id/:product_id', updateCartById);
router.delete('/deleteCart/:id/', deleteCartById);

export default router