'use client'
import React from "react";
import { useAuth } from "@/context/authContext";
import { useCard } from "@/context/CardContext";
import Swal from "sweetalert2";

interface ProductDetailProps {
    id:number;
  name: string;
  image: string;
  price: number;
  stock: number;
  description: string;
}


export const ProductDetail: React.FC<ProductDetailProps> = ({
  id, name, image, price, stock, description
}) => {
    const {addToCart, cart} = useCard();
    const {isAuthenticated} = useAuth();

    const productInCart = cart.some(item => item.id === id);

    const onCartClick = () => {
        const product = { id, name, image, price, stock, description };
        const wasAdded: any = addToCart(product); 

        if (!wasAdded) {
           return;
        }
        return addToCart(product);
    };

    const handleNotAuthenticated = (event: React.MouseEvent) => {
        event.stopPropagation();
        Swal.fire({
            title: "Inicia sesión",
            text: "Debes iniciar sesión para comprar.",
            icon: "warning",
            showConfirmButton: false,
                timer: 2000,
        });
    };

    return (
        <div className=" flex  justify-center  items-center  min-h-screen  bg-gray-100  px-4 md:m-7">
            <div className=" bg-white  shadow-lg  rounded-lg  p-6  md:max-w-5xl  md:h-[500px] m-8 w-full">
                <div className=" flex flex-col  md:flex-row  items-center  gap-6">
                    <div className="w-full  md:w-1/2  flex  justify-center">
                        <img className=" h-96  w-96  object-contain  rounded-lg  shadow-md" src={image} alt={name} />
                    </div>

                    <div className="w-full  md:w-1/2">
                        <h2 className=" text-3xl  font-bold  text-gray-800">{name}</h2>
                        <p className=" text-gray-500  text-lg  mt-2">Stock: <span className="font-semibold">{stock}</span></p>
                        <span className=" text-2xl  font-semibold  text-salmon  mt-4  block">${price}</span>

                        <p className=" text-gray-600  mt-4">{description}</p>
                        <div className="text-center">
                        {isAuthenticated ? (
                            <button
                            onClick={onCartClick}
                            className={`bg-salmon text-white w-full py-2 rounded-md font-semibold ${
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
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
