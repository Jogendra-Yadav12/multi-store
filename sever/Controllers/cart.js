import {
    insertCart,
    getCartByCustomerId,
    updateCartByCustomerId,
    deleteCartData
} from "../Model/cart.js"

export const addCart = (req, res) => {
    const { product_id,name,image,quantity,price,customer_id } = req.body;
    const values = [product_id,name,image,quantity,price,customer_id ];
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
