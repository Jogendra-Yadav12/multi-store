import express from 'express';
import multer from 'multer';
import {
  addCategory,
  getCategories,
  getCategory,
  updateCategoryById,
  deleteCategoryById,
  getCategoryTree
} from '../Controllers/category.js';

const router = express.Router();

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

router.get('/category-tree', getCategoryTree);
router.post('/add-category', upload.single('image'), addCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', getCategory);
router.put('/categories/:id', upload.single('image'), updateCategoryById);
router.delete('/categories/:id', deleteCategoryById);


export default router;
