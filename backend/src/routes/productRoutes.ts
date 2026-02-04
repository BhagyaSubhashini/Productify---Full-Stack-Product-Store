import { Router } from "express";
import * as productController from "../controllers/productController";
import { requireAuth } from "@clerk/express";

const router = Router();

// GET /api/products => GET all products (public)
router.get("/", productController.getAllProducts)

// GET /api/products/my => GET products by current user (protected)
router.get("/my", requireAuth, productController.getMyProducts);

// GET /api/products/:id => GET single product by ID (public)
router.get("/:id", productController.getProductById);

// POST /api/products => Create new product (protected)
router.post("/", requireAuth, productController.createProduct);

// PUT /api/products/:id => Update product (protected owner only)
router.put("/:id", requireAuth, productController.updateProduct);

// DELETE /api/products/:id => Delete product (protected owner only)
router.delete("/:id", requireAuth, productController.deleteProduct);

export default router;