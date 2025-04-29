// routes/categoryRoutes.js
import express from 'express';
import multer from 'multer';
import {
  addCategory,
  getCategories,
  getCategory,
  updateCategoryById,
  deleteCategoryById
} from '../Controllers/category.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.post('/add-category', upload.single('image'), addCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', getCategory);
router.put('/categories/:id', upload.single('image'), updateCategoryById);
router.delete('/categories/:id', deleteCategoryById);

// ✅ New route for category count
router.get('/categories', getCategories);
router.get('/categories/count', async (req, res) => {
  try {
    const [result] = await db.query('SELECT COUNT(*) AS total FROM categories');
    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

export default router;
