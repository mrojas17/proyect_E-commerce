import { IProducts } from "@/types";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;


export const getProducts = async ():
Promise<IProducts[]> => {
    try {
        const response = await axios.get(`${API}/products`);
        return response.data;
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw new Error("No se pudieron obtener los productos");
      };
}

export const getProductById = async (id: number): Promise<IProducts | null> => {
    try {
        const response = await axios.get<IProducts>(`${API}/products/${id}`);

        if (!response?.data) {
            return null;
        }

        return response.data;
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        throw new Error("No se pudo obtener el producto");
    }
};
