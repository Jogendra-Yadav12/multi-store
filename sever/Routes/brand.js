import express from 'express';
import {
    getBrandById,
    getBrands,
    updateBrandById,
    deleteBrandById,
    addBrand,
  } from '../Controllers/brand.js';

const router = express.Router();

router.get('/getbrand', getBrands);
router.get('/getbrand/:id', getBrandById);
router.post('/add-brand', addBrand);
router.put('/brand/:id', updateBrandById);
router.delete('/brand/:id', deleteBrandById);


export default router;