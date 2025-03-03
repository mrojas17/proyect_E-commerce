import { Router } from "express";
import { getProducts, getProductsById } from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductsById);


export default router;
