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
router.put('/categories/:id', updateCategoryById);
router.delete('/categories/:id', deleteCategoryById);

export default router;
