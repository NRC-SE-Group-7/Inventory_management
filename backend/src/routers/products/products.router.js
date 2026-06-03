import express from 'express';
import {createProduct, getProducts} from '../../controllers/products/products.controller.js';


const productsRouter = express.Router();

productsRouter.get('/', getProducts);
//productsRouter.get('/:id', getProductById);
productsRouter.post('/create/', createProduct);
//productsRouter.put('/:id', updateProduct);
//productsRouter.delete('/:id', deleteProduct);

export default productsRouter;
