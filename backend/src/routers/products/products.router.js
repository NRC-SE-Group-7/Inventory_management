import express from "express";
import { createProduct, getProducts } from "../../controllers/products/products.controller.js";

const productsRouter = express.Router();

productsRouter.post('/create/', createProduct);
productsRouter.get("/", getProducts);