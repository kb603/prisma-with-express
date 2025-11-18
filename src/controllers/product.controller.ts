import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.body.name) {
      res.status(422).json({ error: "Name is required" });
    }

    if (!req.body.price) {
      res.status(422).json({ error: "Price is required" });
    } else {
      if (typeof req.body.price !== "number" || req.body.price < 0) {
        res.status(422).json({ error: "Price must be a positive number" });
      }
    }

    if (!req.body.categoryId) {
      res.status(422).json({ error: "Category ID is required" });
    } else {
      if (
        !(await prisma.catergory.findUnique({
          where: { id: parseInt(req.body.categoryId) },
        }))
      )
        res.status(422).json({ error: "Category ID is invalid" });
    }

    const newProduct = await prisma.product.create({
      data: req.body,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: { id: true, name: true },
        },
      },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
