import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import { getProductService, getProductsService } from "../services/products.service";

export const getProducts = catchedController(
  async (req: Request, res: Response) => {
    const products = await getProductsService();
    res.json(products);
  }
);

export const getProductsById = catchedController(
  async (req: Request, res: Response) => {
    const {id} =req.params;
    const products = await getProductService(Number(id));
    res.json(products);
  }
);
