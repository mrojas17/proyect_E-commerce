"use client";
import { IUser } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: IUser | null;
    token?: string | null ;
    isAuthenticated: boolean | null;
    loading: boolean;
    saveUserData: (data: {user: IUser; token: string}) => void;
    resetUserData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ 
    children }: {children: ReactNode}) => {
        const [user, setUser] = useState<AuthContextType["user"]>(null);
        const [token, setToken] = useState<string | null>(null);
        const [isAuthenticated, setIsAuthenticated] = useState<AuthContextType["isAuthenticated"]>(null);
        const [loading, setLoading] = useState(true);

        const saveUserData = (data: {user: IUser; token: string}) => {
            setUser(data.user);
            setIsAuthenticated(true);
            setToken(data.token)
            localStorage.setItem("user", JSON.stringify(data));
            setLoading(false)
        };
        const resetUserData = () => {
            setUser(null);
            setIsAuthenticated(false);
            setToken(null);
            localStorage.removeItem("user");
            setLoading(false)
        };
        useEffect(() => {
            const loadUserData = async () => {
              try {
                const storage = JSON.parse(localStorage?.getItem("user") || "{}");
        
                if (storage === undefined || !Object.keys(storage)?.length) {
                  setIsAuthenticated(false);
                  setUser(null);
                  setToken(null);
                } else {
                  setUser(storage.user);
                  setIsAuthenticated(true);
                  setToken(storage.token);
                }
              } catch (error) {
                console.error("Error al cargar los datos del usuario:", error);
                setIsAuthenticated(false);
                setUser(null);
                setToken(null);
              } finally {
                setLoading(false); // Finaliza la carga después de establecer los estados
              }
            };
        
            loadUserData();
          }, []);

  return (
    <AuthContext.Provider 
    value={{
        user,
        loading,
        token,
        isAuthenticated,
        saveUserData,
        resetUserData
    }}>
        {children}
    </AuthContext.Provider>);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
