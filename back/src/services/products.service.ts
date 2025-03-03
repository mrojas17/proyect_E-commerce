import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

export const checkProductExists = async (itemId: number): Promise<boolean> => {
  const item: Product | null = await ProductRepository.findOneBy({
    id: itemId,
  });
  return !!item;
};
export const getProductsService = async (): Promise<Product[]> => {
  return await ProductRepository.find();
};

export const getProductService = async (id: number): Promise<Product[]> => {
  
    const item: Product | null =
     await ProductRepository.findOneBy({ id: id });

    if (!item) {
      throw new Error("No existe el producto");
    }

    return [item];
};