import { Router } from "express";

import { AuthController } from "./auth.controller";

import { validate } from "../../middleware/validation.middleware";

import { signupSchema, loginSchema } from "./auth.validation";

import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

const controller = new AuthController();

router.post("/signup", validate(signupSchema), controller.signup);

router.post("/login", validate(loginSchema), controller.login);

router.get("/me", authenticate, controller.me);

router.post("/logout", controller.logout);

export default router;
