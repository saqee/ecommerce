import express from "express"
import {
  register,
  getUserProfile,
  login,
  getUserUpdateProfile,
  getAllUsers,
  deleteUser,
  updateUserByAdmin,
  getUserById,
} from "../controllers/userController.js"

import { protect, admin } from "../middleware/authMiddleware.js"
const router = express.Router()
router.post("/register", register)
router.post("/login", login)
router.get("/profile", protect, getUserProfile)
router.put("/profile", protect, getUserUpdateProfile)

router.get("/", protect, admin, getAllUsers)
router.delete("/:id", protect, admin, deleteUser)
router.get("/:id", protect, admin, getUserById)
router.put("/:id", protect, admin, updateUserByAdmin)

export default router
