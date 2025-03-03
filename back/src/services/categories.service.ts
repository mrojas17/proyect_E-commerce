import { CategoryRepository } from "../repositories/category.respository";
import { Category } from "../entities/Category";

export const getCategoriesService = async ():
 Promise<Category[]> => {
  const categories: Category[] | null = await CategoryRepository.
  find();
  return categories;
};