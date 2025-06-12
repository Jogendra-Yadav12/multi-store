import {
    insertCart,
    getCartByCustomerId
} from "../Model/cart.js"

export const addCart = (req, res) => {
    const { product_id,name,image,quantitiy,price,customer_id } = req.body;
    const values = [product_id,name,image,quantitiy,price,customer_id ];
    insertCart(values, (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(201).json({ status: 'success',message: 'Cart added successfully', categoryId: result.insertId });
    });
};

export const getCartById = (req,res) => {
    const { id } = req.params;
    console.log(id);
    getCartByCustomerId(id,(err,results)=> {
        if (err) return res.status(500).json({error:'Database errro'});
        res.json(results);
    })
}
