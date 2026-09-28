import { Router } from "express";
import { signIn, signUp, getProfile, logout } from "../controllers/userController.js";

const router = Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/profile", getProfile);
router.post("/logout", logout);

export default router;