// routes/employeeProfileRoutes.ts
import express from "express";
import {
  getEmployeeProfiles,
  createEmployeeProfile,
  getEmployeeProfileById,
  updateEmployeeProfile,
  deleteEmployeeProfile,
} from "../controllers/employeeProfileController";

const router = express.Router();

router.route("/").get(getEmployeeProfiles).post(createEmployeeProfile);
router
  .route("/:id")
  .get(getEmployeeProfileById)
  .put(updateEmployeeProfile)
  .delete(deleteEmployeeProfile);

export default router;
