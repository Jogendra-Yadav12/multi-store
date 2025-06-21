import {db} from '../config/db.js';

import {
    insertCart,
    getCartByCustomerId,
    updateCartByCustomerId,
    deleteCartData
} from "../Model/cart.js"

export const addCart = (req, res) => {
    const { product_id, name, image, quantity, price, customer_id } = req.body;
    const values = [product_id, name, image, quantity, price, customer_id];

    // First, check if the product already exists in the cart for this customer
    const checkQuery = "SELECT * FROM cart WHERE product_id = ? AND customer_id = ?";
    
    db.query(checkQuery, [product_id, customer_id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error on check' });

        if (result.length > 0) {
            // Product already exists
            return res.status(200).json({ status: 'fail', message: 'Product is already in the cart.' });
        }

        // If product does not exist, insert it
        const insertQuery = "INSERT INTO cart (product_id, name, image, quantity, price, customer_id) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(insertQuery, values, (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error on insert' });
            res.status(201).json({ status: 'success', message: 'Product added to cart!', cartItemId: result.insertId });
        });
    });
};



export const getCartById = (req,res) => {
    const { id } = req.params;
    // console.log(id);
    getCartByCustomerId(id,(err,results)=> {
        if (err) return res.status(500).json({error:'Database errro'});
        res.json(results);
    })
}

export const updateCartById = (req,res) => {
    const { cart_id } = req.params;
    const { quantity} = req.body;
    const values = [quantity,cart_id];
    updateCartByCustomerId(values,(err,results)=> {
        if (err) return res.status(500).json({error:'Database errro'});
        res.json({ message: 'Category updated' });
    })
}

export const deleteCartById  = (req,res) => {
    const { id } = req.params;
    const values = [id];
    deleteCartData(values,(err,results)=> {
        if (err) return res.status(500).json({error:'Database errro'});
        res.json({ message: 'Delete Data' });
    })
}