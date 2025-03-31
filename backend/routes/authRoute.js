import { Router } from "express";
import {
  login,
  signup,
  logout,
  checkAlreadyLoggedIn,
} from "../controllers/authController.js";
import isAuth from "../middleware/isAuth.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkLoggedIn", isAuth, checkAlreadyLoggedIn);

export default router;
