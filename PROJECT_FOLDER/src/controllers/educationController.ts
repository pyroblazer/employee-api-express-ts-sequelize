// controllers/educationController.ts
import { Request, Response } from "express";
import db from "../models";

// Get all education records
export const getEducations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const educations = await db.Education.findAll();
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching educations", error });
  }
};

// Create a new education record
export const createEducation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newEducation = await db.Education.create(req.body);
    res.status(201).json(newEducation);
  } catch (error) {
    res.status(500).json({ message: "Error creating education", error });
  }
};

// Get education by ID
export const getEducationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const education = await db.Education.findByPk(id);
    if (!education) {
      res.status(404).json({ message: `Education with id ${id} not found` });
    } else {
      res.status(200).json(education);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching education with id ${id}`, error });
  }
};

// Update education by ID
export const updateEducation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const [affectedCount, updatedRecords] = await db.Education.update(
      req.body,
      {
        where: { id },
        returning: true,
      }
    );

    if (affectedCount === 0) {
      res.status(404).json({ message: `Education with id ${id} not found` });
    } else {
      res.status(200).json(updatedRecords);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error updating education with id ${id}`, error });
  }
};

// Delete education by ID
export const deleteEducation = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await db.Education.destroy({
      where: { id },
    });
    if (result) {
      res
        .status(200)
        .json({ message: `Education with id ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: `Education with id ${id} not found` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error deleting education with id ${id}`, error });
  }
};
