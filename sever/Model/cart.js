// models/CartModel.js
import { db } from '../config/db.js';


export const insertCart = (values, callback) => {
    const sql = `INSERT INTO cart(product_id,name,image,quantity,price,customer_id) VALUES (?,?,?,?,?,?) `;
    db.query(sql, values, callback);
};

export const getCartByCustomerId = (id,callback) => {
    const sql = `SELECT * FROM cart WHERE customer_id = ?`;
    db.query(sql,[id],callback);
}

export const updateCartByCustomerId = (values ,callback) => {
    const sql = `UPDATE cart SET quantity = ? WHERE id = ?`;
    db.query(sql,values,callback)
}

export const deleteCartData = (values,callback)=>{
    const sql = `DELETE FROM cart WHERE id = ?`;
    db.query(sql,values,callback);
}