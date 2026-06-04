import express from "express";
import { stockIn, stockOut, getInventorySummary } from "../../controllers/inventory/inventory.controller.js";

const inventoryRouter = express.Router();

inventoryRouter.get('/', getInventorySummary);
inventoryRouter.post("/in/", stockIn);
inventoryRouter.post("/out/", stockOut);

export default inventoryRouter;