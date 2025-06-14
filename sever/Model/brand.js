// models/BrandModel.js
import db from '../config/db.js';

export const insertBrand = (values, callback) => {
    const sql = `INSERT INTO brand(name,status) VALUES (? , ?) `;
    db.query(sql, values, callback);
};

export const getAllBrand = (callback) => {
    db.query('SELECT * FROM brand', callback);
};

export const getBrand = (id, callback) => {
    db.query('SELECT * FROM brand WHERE id = ?', [id], callback);
};

export const updateBrand = (values, callback) => {
    const sql = `
      UPDATE brand SET
        name = ?,
        status = ?
      WHERE id = ?
    `;
    db.query(sql, values, callback);
};

export const deleteBrand = (id,callback)=>{
    const sql = `
        DELETE FROM brand 
        WHERE id = ?
    `;
    db.query(sql,[id],callback);
}