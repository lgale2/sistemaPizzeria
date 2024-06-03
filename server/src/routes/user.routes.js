import { Router } from "express";
import { Register, login, logout, verifyToken } from "../controllers/userController.js";
import { validateSchema } from "../middlewares/validaterMiddleware.js";
import { createSchema } from "../schemas/validationUser.js";

const router = Router();

router.post("/auth/register", validateSchema(createSchema), Register);
router.post("/auth/login",validateSchema(createSchema), login);
router.post("/auth/logout", logout);
router.get("/auth/verify", verifyToken)

export default router;
