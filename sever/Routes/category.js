// routes/categoryRoutes.js
import express from 'express';
import {
  addCategory,
  getCategories,
  getCategory,
  updateCategoryById,
  deleteCategoryById
} from '../Controllers/category.js';

const router = express.Router();

router.post('/add-category', addCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', getCategory);
router.put('/categories/:id', updateCategoryById);
router.delete('/categories/:id', deleteCategoryById);

export default router;
