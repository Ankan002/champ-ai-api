import { login, logout } from "controllers/auth";
import { Router } from "express";
import { isAuthenticated, isUnauthenticated } from "middlewares/auth";

export const authRouter = Router();

authRouter.route("/login").post(isUnauthenticated, login);

authRouter.route("/logout").post(isAuthenticated, logout);
