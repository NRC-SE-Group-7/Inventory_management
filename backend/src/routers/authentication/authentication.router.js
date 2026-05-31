import express from "express";
import {login, register} from "../../controllers/authentication/authentication.controller.js";

const authRouter = express.Router();

authRouter.post("/register/", register);
authRouter.post("/login/", login);

export default authRouter;