import {
  insertProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getBestDeals,
  getProductByCatroyId
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

  // ✅ Handle multiple images from multer
  const images = req.files ? req.files.map(file => file.filename).join(',') : '';

  const values = [
    name,
    category,
    brand,
    parseFloat(price),
    parseFloat(discount_price),
    stock,
    parseInt(quantity),
    status,
    description,
    images
  ];
  
  insertProduct(values, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err });
    res.status(201).json({
      status: 'success',
      message: 'Product added successfully',
      productId: result.insertId
    });
  });
};

export const bestDeals = (req, res) => {
  getBestDeals((err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err });
    res.status(200).json({
      status: 'success',
      data: results
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

export const getProductByCategory = (req, res) => {
  const { id } = req.params;
  getProductByCatroyId(id, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(results);
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
  console.log(req.body);
  const uploadedImages = req.files ? req.files.map(file => file.filename) : [];
  const preservedImages = existing_images ? existing_images.split(',') : [];
  const finalImages = [...preservedImages, ...uploadedImages].join(',');

  const values = [
    name,
    parseInt(category),
    brand,
    parseFloat(price),
    parseFloat(discount_price),
    stock === '1' ? 1 : 0,
    parseInt(quantity),
    status === '1' ? 1 : 0,
    description,
    finalImages,
    id
  ];
  console.log(values)
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
