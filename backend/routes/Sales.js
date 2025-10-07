import express from 'express';
import { getSales, getSale, createSale, updateSale,
  deleteSale } from '../controllers/salesController.js';

const router = express.Router();

router.route('/')
      .get(getSales)
      .post(createSale);

router.route('/:id')
  .get(getSale)
  .put(updateSale)
  .delete(deleteSale);

export default router;