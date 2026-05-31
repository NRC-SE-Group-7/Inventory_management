import express from 'express';
<<<<<<< HEAD
import authRouter from './src/routers/authentication/authentication.router.js';
import dotenv from "dotenv";

dotenv.config();
=======
import productsRouter from './src/routers/products.router.js';
>>>>>>> feature/ui

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/auth/", authRouter)

<<<<<<< HEAD
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message:`Internal Server Error: ${err}` });
});
=======
app.use('/api/products', productsRouter);
>>>>>>> feature/ui

export default app;