// routes/employeeFamilyRoutes.ts
import express from "express";
import {
  getEmployeeFamilies,
  createEmployeeFamily,
  getEmployeeFamilyById,
  updateEmployeeFamily,
  deleteEmployeeFamily,
} from "../controllers/employeeFamilyController";

const router = express.Router();

router.route("/").get(getEmployeeFamilies).post(createEmployeeFamily);
router
  .route("/:id")
  .get(getEmployeeFamilyById)
  .put(updateEmployeeFamily)
  .delete(deleteEmployeeFamily);

export default router;
