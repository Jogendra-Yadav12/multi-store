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

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg, and .jpeg format allowed!'));
    }
  }
});

router.post('/add-product', upload.array('images', 5), addProduct);
router.get('/product', getProducts);
router.get('/product/:id', getProduct);
router.put('/product/:id', upload.array('images', 5), updateProductById);
router.delete('/product/:id', deleteProductById);

router.get('/products/count', async (req, res) => {
  try {
    const [result] = await db.query('SELECT COUNT(*) AS total FROM product');
    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
