import { Router } from "express";
import {
  getDoctorReviews,
  getUnreviewedCompletedAppointments,
  postReview,
} from "../controllers/reviewController.js";

const router = Router();

router.get("/:id/reviews", getDoctorReviews);
router.get("/:id/reviews/:user_id", getUnreviewedCompletedAppointments);
router.post("/:id/reviews/:user_id/:appointment_id", postReview);
export default router;
