import { Request, Response } from "express";
import bankModel from "../models/bank.model";

export const createBank = async (req: Request, res: Response): Promise<void> => {
  try {
    const bank = new bankModel(req.body);
    await bank.save();
    res.status(201).json(bank);
  } catch (error) {
    res.status(500).json({ message: "Error creating Bank", error });
  }
};

export const getBanks = async (req: Request, res: Response): Promise<void> => {
  try {
    const banks = await bankModel.find().sort({ createdAt: -1 });
    res.status(200).json(banks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Banks", error });
  }
};

export const updateBank = async (req: Request, res: Response): Promise<void> => {
  try {
    const bank = await bankModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!bank) {
      res.status(404).json({ message: "Bank not found" });
      return;
    }

    res.status(200).json(bank);
  } catch (error) {
    res.status(500).json({ message: "Error updating Bank", error });
  }
};

export const deleteBank = async (req: Request, res: Response): Promise<void> => {
  try {
    const bank = await bankModel.findByIdAndDelete(req.params.id);

    if (!bank) {
      res.status(404).json({ message: "Bank not found" });
      return;
    }

    res.status(200).json({ message: "Bank deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Bank", error });
  }
};
