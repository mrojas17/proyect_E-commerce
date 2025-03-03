import { IUser } from "@/types";
import axios from "axios";

export const API = process.env.NEXT_PUBLIC_API_URL;


export const registerUser = async (userData: Partial<IUser>): Promise<string> => {
    try {
        await axios.post(`${API}/users/register`, userData);
        return "SUCCESS_REGISTER";
        
    } catch (error: any) {
        console.warn("Error al registrar el usuario:", error);
        const errorMessage = error.response?.data?.message || "No se pudo registrar el usuario";
        throw new Error(errorMessage);
    }
}

export const loginUser = async (userData: Partial<IUser>): Promise<{ user: IUser; token: string }> => {
    try {
        const user = await axios.post(`${API}/users/login`, userData);
        return user.data;
    } catch (error: any) {
        console.warn("Error al iniciar sesión:", error);
        const errorMessage = error.response?.data?.message || "No se pudo iniciar sesión";
        throw new Error(errorMessage);
    }
}

export const getUsersOrders = async (token: string) =>{
    try {
        const response = await axios.get(`${API}/users/orders`, {
            headers: {
            authorization: `${token}`
        },
        });

        if(response){
            return response.data
        }

    } catch (error) {
        console.warn("No se pudieron obtener las ordenes", error);
        throw new Error("No se pueden obtener las ordenes");
    }
}