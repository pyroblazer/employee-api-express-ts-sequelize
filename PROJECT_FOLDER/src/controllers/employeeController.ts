// controllers/employeeController.ts
import { Request, Response } from "express";
import db from "../models";

// Get all employees
export const getEmployees = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees = await db.Employee.findAll();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};

// Create a new employee
export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newEmployee = await db.Employee.create(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error creating employee", error });
  }
};

// Get employee by ID
export const getEmployeeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const employee = await db.Employee.findByPk(id);
    if (!employee) {
      res.status(404).json({ message: `Employee with id ${id} not found` });
    } else {
      res.status(200).json(employee);
    }
  } catch (error) {
    res.status(500).json({
      message: `Error fetching employee with id ${id}`,
      error,
    });
  }
};

// Update employee by ID
export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const [affectedCount, updatedRecords] = await db.Employee.update(req.body, {
      where: { id: id },
      returning: true,
    });

    if (affectedCount === 0) {
      res.status(404).json({ message: `Employee with id ${id} not found` });
    } else {
      res.status(200).json(updatedRecords);
    }
  } catch (error) {
    res.status(500).json({
      message: `Error updating employee with id ${id}`,
      error,
    });
  }
};

// Delete employee by ID
export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await db.Employee.destroy({
      where: { id: id },
    });
    if (result) {
      res
        .status(200)
        .json({ message: `Employee with id ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: `Employee with id ${id} not found` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error deleting employee with id ${id}`, error });
  }
};

// Get Employee Report
export const getEmployeeReports = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees = await db.Employee.findAll({
      attributes: [
        ["id", "employee_id"],
        "nik",
        "name",
        "is_active",
        [db.sequelize.col("employee_profile.gender"), "gender"],
        [
          db.sequelize.literal(
            "CONCAT(EXTRACT(YEAR FROM AGE(CAST(employee_profile.date_of_birth AS DATE))), ' Years Old')"
          ),
          "age",
        ],
        [db.sequelize.col("education.name"), "school_name"],
        [db.sequelize.col("education.level"), "level"],
        [
          db.sequelize.literal(`
            COALESCE(
              CONCAT(
                COUNT(CASE WHEN employee_family.relation_status = 'Istri' THEN 1 END), ' Istri & ',
                COUNT(CASE WHEN employee_family.relation_status = 'Anak' THEN 1 END), ' Anak'
              ), '-'
            )
          `),
          "family_data",
        ],
      ],
      include: [
        {
          model: db.EmployeeProfile,
          as: "employee_profile",
          attributes: [],
        },
        {
          model: db.Education,
          as: "education",
          attributes: [],
          required: false,
        },
        {
          model: db.EmployeeFamily,
          as: "employee_family",
          attributes: [],
          required: false,
        },
      ],
      group: [
        "Employee.id",
        "Employee.nik",
        "Employee.name",
        "Employee.is_active",
        "employee_profile.gender",
        "employee_profile.date_of_birth",
        "education.name",
        "education.level",
      ],
      order: [["id", "ASC"]],
    });

    res.json(employees);
  } catch (error) {
    console.error("Error fetching employee report:", error);
    res
      .status(500)
      .json({ message: "Error retrieving employee report", error });
  }
};
