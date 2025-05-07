import express from "express";
import multer from 'multer';
import {
    addCustomer,
    getCustomers,
    getCustomer,
    loginCustomer,
    updateCustomerById,
    deleteCustomerById
} from '../Controllers/customers.js';

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

router.post('/admin', loginCustomer);
router.post('/add-customer', upload.single('image'), addCustomer);
router.get('/customers', getCustomers);
router.get('/customer/:id', getCustomer);
router.put('/customer/:id', upload.single('image'), updateCustomerById);
router.delete('/customer/:id', deleteCustomerById);

export default router;