import axios from "axios";

export const API = process.env.NEXT_PUBLIC_API_URL;

export interface DtoOrder {
    userId: number,
    products: number[]
}

export const postOrder = async (orderData: DtoOrder, token:string) => {
    try {
        const response = await axios.post(`${API}/orders`, orderData,{
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        console.warn("Error al enviar la orden:", error);
        throw new Error("No se pudo hacer la orden");
    }

}