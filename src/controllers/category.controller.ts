import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.body.name) {
      res.status(400).json({ error: "Name is required" });
      return;
    }

    if (await prisma.catergory.findUnique({ where: { name: req.body.name } })) {
      res.status(409).json({ error: `${req.body.name} already exists` });
    }

    const newCategory = await prisma.catergory.create({
      data: { name: req.body.name },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await prisma.catergory.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (
      !(await prisma.catergory.findUnique({
        where: { id: parseInt(req.params.id) },
      }))
    ) {
      res.status(404).json({ error: "Category not found" });
    }

    if (!req.body.name) {
      res.status(400).json({ error: "Name is required" });
      return;
    }

    if (await prisma.catergory.findUnique({ where: { name: req.body.name } })) {
      res.status(409).json({ error: `${req.body.name} already exists` });
    }

    const updatedCategory = await prisma.catergory.update({
      data: { name: req.body.name },
      where: { id: parseInt(req.params.id) },
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (
      !(await prisma.catergory.findUnique({
        where: { id: parseInt(req.params.id) },
      }))
    ) {
      res.status(404).json({ error: "Category not found" });
    }

    await prisma.catergory.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
