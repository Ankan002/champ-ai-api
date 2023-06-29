import { login } from "controllers/auth";
import { Router } from "express";
import { isUnauthenticated } from "middlewares/auth";

export const authRouter = Router();

authRouter.route("/login").post(isUnauthenticated, login);
