// controllers/employeeFamilyController.ts
import { Request, Response } from "express";
import db from "../models";

// Get all employee families
export const getEmployeeFamilies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employeeFamilies = await db.EmployeeFamily.findAll();
    res.status(200).json(employeeFamilies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employee families", error });
  }
};

// Create a new employee family record
export const createEmployeeFamily = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newEmployeeFamily = await db.EmployeeFamily.create(req.body);
    res.status(201).json(newEmployeeFamily);
  } catch (error) {
    res.status(500).json({ message: "Error creating employee family", error });
  }
};

// Get employee family by ID
export const getEmployeeFamilyById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const employeeFamily = await db.EmployeeFamily.findByPk(id);
    if (!employeeFamily) {
      res
        .status(404)
        .json({ message: `Employee family with id ${id} not found` });
    } else {
      res.status(200).json(employeeFamily);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching employee family with id ${id}`, error });
  }
};

// Update employee family by ID
export const updateEmployeeFamily = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const [affectedCount, updatedRecords] = await db.EmployeeFamily.update(
      req.body,
      {
        where: { id },
        returning: true,
      }
    );

    if (affectedCount === 0) {
      res
        .status(404)
        .json({ message: `Employee family with id ${id} not found` });
    } else {
      res.status(200).json(updatedRecords);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating employee family with id ${id}`, error });
  }
};

// Delete employee family by ID
export const deleteEmployeeFamily = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await db.EmployeeFamily.destroy({
      where: { id },
    });
    if (result) {
      res
        .status(200)
        .json({
          message: `Employee family with id ${id} deleted successfully`,
        });
    } else {
      res
        .status(404)
        .json({ message: `Employee family with id ${id} not found` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error deleting employee family with id ${id}`, error });
  }
};
