import express from 'express';
import authRouter from './src/routers/authentication/authentication.router.js';
import dotenv from "dotenv";
import cors from "cors";
import productsRouter from './src/routers/products/products.router.js';
import inventoryRouter from './src/routers/inventory/inventory.router.js';
dotenv.config();

const corsOptions= {
    origin:"http://locahost:5173",
    methods:["GET", "POST"]
} 

const app = express();
app.use(cors({
    origin: [
       'https://nrc-inventory-ksaucnnxm-innocent-kamesa-s-projects.vercel.app',
        'https://nrc-inventory-le86by25y-innocent-kamesa-s-projects.vercel.app',
        'https://nrc-inventory.vercel.app',
        'http://localhost:5173'
        ]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/auth/", authRouter);
app.use("/products/", productsRouter);
app.use("/inventory/", inventoryRouter);

app.use((err, req, res, next) => {
    console.log(`Internal server error: ${err}`);
    res.status(500).json({ message: `Internal Server Error: ${err}` });
});

export default app;
