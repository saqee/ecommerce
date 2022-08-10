import express from "express"
import {
  getProducts,
  getProductById,
  getProductDelete,
  createProduct,
  updateProduct,
} from "../controllers/productController.js"
import { protect, admin } from "../middleware/authMiddleware.js"
const router = express.Router()
router.get("/", getProducts)
router.post("/", protect, createProduct)
router.get("/:id", getProductById)
router.put("/:id", updateProduct)
router.delete("/:id", protect, admin, getProductDelete)
export default router
