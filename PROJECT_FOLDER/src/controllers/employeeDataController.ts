// controllers/employeeDataController.ts
import { Request, Response } from "express";
import db from "../models";

const { Employee, EmployeeProfile, EmployeeFamily, Education } = db;

// Get all employee data with relations
export const getAllEmployeeData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees = await Employee.findAll({
      include: [
        { model: EmployeeProfile, as: "employee_profile" },
        { model: EmployeeFamily, as: "employee_family" },
        { model: Education, as: "education" },
      ],
    });
    res.json(employees);
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          "Error retrieving employee data, including their profile, family, & education",
        error,
      });
  }
};

// Get one employee data with relations
export const getOneEmployeeData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const employee = await Employee.findOne({
      where: { id: Number(id) },
      include: [
        { model: EmployeeProfile, as: "employee_profile" },
        { model: EmployeeFamily, as: "employee_family" },
        { model: Education, as: "education" },
      ],
    });

    if (!employee) {
      res.status(404).json({ message: `Employee with id ${id} not found` });
    } else {
      res.json(employee);
    }
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving employee data, including its profile, family, & education, for id ${id}`,
      error,
    });
  }
};

// Create Employee and its profile, family, & education
export const createEmployeeData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { employeeData, profileData, familyData, educationData } = req.body;

  const transaction = await db.sequelize.transaction();

  try {
    const newEmployee = await Employee.create(employeeData, { transaction });

    if (profileData) {
      await EmployeeProfile.create(
        { ...profileData, employee_id: newEmployee.id },
        { transaction }
      );
    }

    if (Array.isArray(familyData)) {
      await Promise.all(
        familyData.map((family: any) =>
          EmployeeFamily.create(
            { ...family, employee_id: newEmployee.id },
            { transaction }
          )
        )
      );
    }

    if (Array.isArray(educationData)) {
      await Promise.all(
        educationData.map((education: any) =>
          Education.create(
            { ...education, employee_id: newEmployee.id },
            { transaction }
          )
        )
      );
    }

    await transaction.commit();
    res.status(201).json(newEmployee);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      message: `Error creating employee data including its profile, family, & education`,
      error,
    });
  }
};

// Update Employee and its profile, family, & education
export const updateEmployeeData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { employeeData, profileData, familyData, educationData } = req.body;

  const transaction = await db.sequelize.transaction();

  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      res.status(404).json({ message: `Employee with id ${id} not found` });
    } else {
      await employee.update(employeeData, { transaction });

      let updatedEmployeeProfile = null;
      if (profileData) {
        updatedEmployeeProfile = await EmployeeProfile.upsert(
          { ...profileData, employee_id: id },
          { transaction, returning: true }
        );
      }

      let updatedEmployeeFamily = [];
      if (Array.isArray(familyData)) {
        updatedEmployeeFamily = await Promise.all(
          familyData.map((family: any) =>
            EmployeeFamily.upsert(
              { ...family, employee_id: id },
              { transaction, returning: true }
            )
          )
        );
      }

      let updatedEducation = [];
      if (Array.isArray(educationData)) {
        updatedEducation = await Promise.all(
          educationData.map((education: any) =>
            Education.upsert(
              { ...education, employee_id: id },
              { transaction, returning: true }
            )
          )
        );
      }

      await transaction.commit();

      const updatedData = {
        employeeData: employee,
        profileData: updatedEmployeeProfile[0],
        familyData: updatedEmployeeFamily.map((result) => result[0]),
        educationData: updatedEducation.map((result) => result[0]),
      };

      res.status(200).json(updatedData);
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      message: `Error updating employee data, including its profile, family, & education, for employee id ${id}`,
      error,
    });
  }
};

// Delete Employee and its profile, family, & education
export const deleteEmployeeData = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const transaction = await db.sequelize.transaction();

  try {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      res.status(404).json({ message: `Employee with id ${id} not found` });
    } else {
      await EmployeeFamily.destroy({ where: { employee_id: id }, transaction });
      await Education.destroy({ where: { employee_id: id }, transaction });
      await EmployeeProfile.destroy({
        where: { employee_id: id },
        transaction,
      });
      await employee.destroy({ transaction });

      await transaction.commit();
      res.status(200).json({
        message: `Employee data including its profile, family, & education, with employee id ${id} deleted successfully`,
      });
    }
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      message: `Error deleting employee data including its profile, family, & education, with employee id ${id}`,
      error,
    });
  }
};
