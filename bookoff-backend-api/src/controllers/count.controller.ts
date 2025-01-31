import { Request, Response } from "express";
import countService from "../services/count.service";

export const getCounts = async (req: Request, res: Response): Promise<void> => {
  try {
    const counts = await countService.getCounts();
    res.json(counts);
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export default {
  getCounts,
};
