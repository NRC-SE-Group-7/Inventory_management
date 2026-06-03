import express from "express";
import {stockIn, stockOut} from "../../controllers/inventory/inventory.controller.js";

const inventoryRouter = express.Router();

inventoryRouter.post("/in/", stockIn);
inventoryRouter.post("/out/", stockOut);

export default inventoryRouter;