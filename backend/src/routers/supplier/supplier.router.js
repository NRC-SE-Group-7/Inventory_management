import express from 'express';
import { createSupplier, getSuppliers } from '../../controllers/supplier/supplier.controller.js';

const supplierRouter = express.Router();

supplierRouter.get('/get/', getSuppliers);
supplierRouter.post('/create/', createSupplier);

export default supplierRouter;
