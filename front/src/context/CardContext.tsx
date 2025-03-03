"use client";
import { IProducts } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState} from "react";

interface CardContextType {
  total: number;
  cart: IProducts[];
  addToCart: (product: any) => void;
  removeFromCart: (product: any) => void;
  resetCart: () => void;
  clearCart: () => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider = ({ 
  children }: {children: ReactNode}) => {

    const [cart, setCart] = useState<IProducts[]>([]);
    const [total, setTotal] = useState<number>(0);

    const addToCart = (product: any) => {
      let wasAdded = false;
    
      setCart((prevCart = []) => {
        const productExists = prevCart.some((item) => item.id === product.id);
    
        if (productExists) {
          return prevCart;
        }
    
        wasAdded = true;
        const updatedCart = [...prevCart, product];
        
        setTotal(updatedCart.length);
    
        return updatedCart;
      });
    
      return wasAdded;  
    };
    
    
    

  const removeFromCart = (id: number) => {

    setCart((prevCart = []) => prevCart.filter((product) => product.id !== id));

    setTotal((prevTotal)=> {

      if(prevTotal === 0 || !prevTotal) {
        return 0;
      }
      return prevTotal-1;
    });
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
    localStorage.removeItem("cart");
    localStorage.removeItem("total");
  };

  const resetCart = () => setTimeout(() => {setCart([]); setTotal(0)}, 3100);

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    const localTotal = localStorage.getItem("total");

    if (localCart) {
      setCart(JSON.parse(localCart));
    } else {
      setCart([]);
    }

    if (localTotal) {
      setTotal(Number(localTotal));
    } else {
      setTotal(0);
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("total", total.toString());
    } else {
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
    }
  }, [cart, total]);

  return (
    <CardContext.Provider 
    value={{
      total: total || 0,
      cart: cart || [],
      addToCart,
      removeFromCart,
      resetCart,
      clearCart
    }}>
        {children}
    </CardContext.Provider>);
};

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCard must be used within an CardProvider");
  }
  return context;
};