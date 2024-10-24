// controllers/employeeProfileController.ts
import { Request, Response } from "express";
import db from "../models";

// Get all employee profiles
export const getEmployeeProfiles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employeeProfiles = await db.EmployeeProfile.findAll();
    res.status(200).json(employeeProfiles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employee profiles", error });
  }
};

// Create a new employee profile
export const createEmployeeProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newEmployeeProfile = await db.EmployeeProfile.create(req.body);
    res.status(201).json(newEmployeeProfile);
  } catch (error) {
    res.status(500).json({ message: "Error creating employee profile", error });
  }
};

// Get employee profile by ID
export const getEmployeeProfileById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const employeeProfile = await db.EmployeeProfile.findByPk(id);
    if (!employeeProfile) {
      res
        .status(404)
        .json({ message: `Employee profile with id ${id} not found` });
    } else {
      res.status(200).json(employeeProfile);
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: `Error fetching employee profile with id ${id}`,
        error,
      });
  }
};

// Update employee profile by ID
export const updateEmployeeProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const [affectedCount, updatedRecords] = await db.EmployeeProfile.update(
      req.body,
      {
        where: { id },
        returning: true,
      }
    );

    if (affectedCount === 0) {
      res
        .status(404)
        .json({ message: `Employee profile with id ${id} not found` });
    } else {
      res.status(200).json(updatedRecords);
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: `Error updating employee profile with id ${id}`,
        error,
      });
  }
};

// Delete employee profile by ID
export const deleteEmployeeProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await db.EmployeeProfile.destroy({
      where: { id },
    });
    if (result) {
      res
        .status(200)
        .json({
          message: `Employee profile with id ${id} deleted successfully`,
        });
    } else {
      res
        .status(404)
        .json({ message: `Employee profile with id ${id} not found` });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: `Error deleting employee profile with id ${id}`,
        error,
      });
  }
};
