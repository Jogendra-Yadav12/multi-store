import {
    insertBrand,
    getAllBrand,
    getBrand,
    updateBrand,
    deleteBrand
  } from '../Model/brand.js';
  
  export const addBrand = (req, res) => {
    const {name,status} = req.body;
    // console.log(req.body);
    const values = [name,status];
    insertBrand(values, (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error', details: err });
      res.status(201).json({
        status: 'success',
        message: 'Brand added successfully',
        brandId: result.insertId
      });
    });
  }

export const getBrandById = (req, res) => {
    const { id } = req.params;
    getBrand(id, (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) return res.status(404).json({ error: 'Product not found' });
      res.json(results[0]);
    });
}

export const getBrands = (req, res) => {
    getAllBrand((err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
      });
}

export const updateBrandById = (req, res) => {
    const { id } = req.params;
    const {name,status} = req.body;

    const values = [name,status,id];
    updateBrand(values, (err) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ message: 'Brand updated successfully' });
      });
}

export const deleteBrandById = (req, res) => {
    const { id } = req.params;
    deleteBrand(id,(err)=>{
        if(err) return res.status(500).json({error:'Databse error'});
        res.json({message:'Brand Delete Successfully'});
    })
}