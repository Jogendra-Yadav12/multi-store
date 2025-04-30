import {
    insertProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct
  } from '../Model/product.js';
  
  export const addProduct = (req, res) => {
    const {
      name,
      category,
      brand,
      price,
      discount_price,
      stock,
      quantity,
      status,
      description
    } = req.body;
  
    const images = req.files ? req.files.map(file => file.filename).join(',') : null;
    const statusValue = status === '1' ? 1 : 0;
  
    const values = [
      name,
      category,
      brand,
      parseFloat(price),
      parseFloat(discount_price || 0),
      parseInt(stock),
      parseInt(quantity),
      statusValue,
      description,
      images
    ];
  
    insertProduct(values, (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.status(201).json({
        status: 'success',
        message: 'Product added successfully',
        productId: result.insertId
      });
    });
  };
  
  export const getProducts = (req, res) => {
    getAllProduct((err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json(results);
    });
  };
  
  export const getProduct = (req, res) => {
    const { id } = req.params;
    getProductById(id, (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) return res.status(404).json({ error: 'Product not found' });
      res.json(results[0]);
    });
  };
  
  export const updateProductById = (req, res) => {
    const { id } = req.params;
    const {
      name,
      category,
      brand,
      price,
      discount_price,
      stock,
      quantity,
      status,
      description,
      existing_images
    } = req.body;
  
    // Handle updated or preserved images
    const uploadedImages = req.files ? req.files.map(file => file.filename) : [];
    const allImages = [...uploadedImages, ...(existing_images ? existing_images.split(',') : [])];
    const finalImages = allImages.join(',');
  
    const values = [
      name,
      category,
      brand,
      parseFloat(price),
      parseFloat(discount_price || 0),
      parseInt(stock),
      parseInt(quantity),
      status === '1' ? 1 : 0,
      description,
      finalImages,
      id
    ];
  
    updateProduct(values, (err) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ message: 'Product updated successfully' });
    });
  };
  
  export const deleteProductById = (req, res) => {
    const { id } = req.params;
    deleteProduct(id, (err) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      res.json({ message: 'Product deleted successfully' });
    });
  };
  