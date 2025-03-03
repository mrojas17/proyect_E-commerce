import { ICategory } from "@/types";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;


export const getCategories = async ():
Promise<ICategory[]> => {
    try {
        const response = await axios.get(`${API}/categories`);
        return response.data;
      } catch (error) {
        console.error("Error al obtener las categorias:", error);
        throw new Error("No se pudieron obtener las categorias");
      };
}