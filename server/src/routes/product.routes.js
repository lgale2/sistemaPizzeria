import { Router } from "express";
import {
  deleteProduct,
  getProduct,
  getProductId,
  saveProduct,
  updateProduct,
} from "../controllers/productController.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validaterMiddleware.js";
import { createSchema } from "../schemas/validationSchema.js";

const router = Router();

router.get("/product", authRequired, getProduct);
router.get("/product/:id", authRequired, getProductId);
router.post(
  "/product/",
  authRequired,
  validateSchema(createSchema),
  saveProduct
);
router.put("/product/:id", authRequired, updateProduct);
router.delete("/product/:id", authRequired, deleteProduct);
export default router;
