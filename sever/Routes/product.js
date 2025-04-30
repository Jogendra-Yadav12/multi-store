// routes/ProductsRoutes.js
import express from 'express';
import multer from 'multer';
import {
  addProduct,
  getProduct,
  getProducts,
  updateProductById,
  deleteProductById
} from '../Controllers/product.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.post('/add-product', upload.single('image'), addProduct);
router.get('/product', getProducts);
router.get('/product/:id', getProduct);
router.put('/product/:id', upload.single('image'), updateProductById);
router.delete('/product/:id', deleteProductById);

router.get('/product', getProduct);

router.get('/products/count', async (req, res) => {
  try {
    const [result] = await db.query('SELECT COUNT(*) AS total FROM products');
    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
