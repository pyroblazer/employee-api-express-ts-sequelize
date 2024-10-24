import express from "express";
import {
  getEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeReports,
} from "../controllers/employeeController";
import {
  getAllEmployeeData,
  getOneEmployeeData,
  createEmployeeData,
  updateEmployeeData,
  deleteEmployeeData,
} from "../controllers/employeeDataController";

const router = express.Router();

// Specific Employee Data Routes
router.route("/data").get(getAllEmployeeData).post(createEmployeeData);
router
  .route("/data/:id")
  .get(getOneEmployeeData)
  .put(updateEmployeeData)
  .delete(deleteEmployeeData);

// Employee Reports Route
router.route("/reports").get(getEmployeeReports);

// General Employee Routes (more generic, placed after /data and /report)
router
  .route("/:id")
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);
router.route("/").get(getEmployees).post(createEmployee);

export default router;
