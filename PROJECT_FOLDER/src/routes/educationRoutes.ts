// routes/educationRoutes.ts
import express from "express";
import {
  getEducations,
  createEducation,
  getEducationById,
  updateEducation,
  deleteEducation,
} from "../controllers/educationController";

const router = express.Router();

router.route("/").get(getEducations).post(createEducation);
router
  .route("/:id")
  .get(getEducationById)
  .put(updateEducation)
  .delete(deleteEducation);

export default router;
