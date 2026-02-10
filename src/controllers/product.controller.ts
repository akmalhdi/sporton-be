import { Request, Response } from "express";
import productModel from "../models/product.model";

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productData = req.body;

    if (req.file) {
      productData.imageUrl = req.file.path;
    }

    const product = new productModel(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating Product", error });
  }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productModel.find().populate("category").sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Products", error });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productModel.findById(req.params.id).populate("category");

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Product", error });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productData = req.body;

    if (req.file) {
      productData.imageUrl = req.file.path;
    }

    const product = await productModel.findByIdAndUpdate(req.params.id, productData, { new: true });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating Product", error });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Product", error });
  }
};
