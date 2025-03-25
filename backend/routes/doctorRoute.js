import express from "express";
import isAuth from "../middleware/isAuth.js";
import isAdmin from "../middleware/isAdmin.js";
import {
  createDoctor,
  editDoctor,
  removeDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

// Create doctor route
router.use(isAuth);
router.post("/createDoctor", isAdmin, createDoctor);

// Edit doctor route
router.patch("/updateDoctor/:doctorId", isAdmin, editDoctor);

// Remove doctor route
router.delete("/removeDoctor/:doctorId", isAdmin, removeDoctor);

// add doctor schedule
// router.post("/doctor/:doctorid/addSchedule", isAdmin, addSchedule);

export default router;
