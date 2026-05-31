import express from 'express';
import authRouter from './src/routers/authentication/authentication.router.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/auth/", authRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message:`Internal Server Error: ${err}` });
});

export default app;