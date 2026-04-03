import express from "express";
import { logout,signup,login,check } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.mddleware.js";
const router = express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/check",protectRoute,check)

export default router;