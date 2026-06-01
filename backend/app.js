import express from 'express';
import authRouter from './src/routers/authentication/authentication.router.js';
import dotenv from "dotenv";
import cors from "cors";
import productsRouter from './src/routers/products.router.js';
dotenv.config();

const corsOptions= {
    origin:"http://locahost:5173",
    methods:["GET", "POST"]
} 

const app = express();
app.use(cors({
    origin: [
        'https://inventory-management-g6jlqmr9z-innocent-kamesa-s-projects.vercel.app',
        'https://inventory-management-bg5cghr5p-innocent-kamesa-s-projects.vercel.app'
        ]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/auth/", authRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message:`Internal Server Error: ${err}` });
});

export default app;
