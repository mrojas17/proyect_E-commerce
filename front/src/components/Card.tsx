import { useAuth } from "@/context/authContext";
import React from "react";

interface CardProps {
    name: string;
    image: string;
    price: number;
    stock: number;
    onClick: () => void;
    onCartClick?: (e: any) => void;
    productInCart: boolean;
    handleNotAuthenticated: (event: React.MouseEvent) => void;
}

export const Card: React.FC<CardProps> = ({ 
     name, image, price, stock, productInCart, onClick= () => null, onCartClick = () =>  null, handleNotAuthenticated = () => null
 }) => {
        const {isAuthenticated} = useAuth();
        return (
            <div
              className="bg-gray-300 shadow-lg p-2 sm:p-4 w-full max-w-xs text-center rounded-md"
              onClick={onClick}
              role="button"
            >
              <div className="w-full h-36 sm:h-40 flex justify-center items-center shadow-md bg-white">
                <img
                  className="h-full object-contain"
                  src={image}
                  alt={name}
                  loading="lazy" 
                />
              </div>
          
              <div className="bg-white p-2 sm:p-3">
                <h2 className="text-sm sm:text-base font-bold">{name}</h2>
                <p className="text-xs sm:text-sm text-gray-500">Stock: {stock}</p>
                <span className="text-sm sm:text-base font-semibold text-salmon">
                  ${price}
                </span>
              </div>
          
              <div className="mt-2 sm:mt-4">
                {isAuthenticated ? (
                  <button
                  onClick={onCartClick}
                  className={`bg-salmon text-white w-full py-2 rounded-md font-semibold hover:bg-salmonClaro${
                    productInCart ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={productInCart}
                  title={productInCart ? "Este producto ya está en tu carrito." : "Agregar al carrito"}
                >
                  {productInCart ? "Ya en el carrito" : "Comprar"}
                </button>
                ) : (
                  <button
                    onClick={handleNotAuthenticated}
                    className="bg-salmon text-white w-full py-2 rounded-md font-semibold hover:bg-salmonClaro"
                    >
                    Comprar
                    </button>
                )}
              </div>
            </div>
          );
};

export default Card;