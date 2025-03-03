"use client";
import React, { useEffect } from "react";
import { useState } from "react"
import Card from "./Card";
import { useRouter } from "next/navigation";
import { routes } from "@/routes/routes";
import { IProducts } from "@/types";
import { useCard } from "@/context/CardContext";
import Swal from "sweetalert2";

type ProductPreview = Pick<IProducts, 'name' | 'price' | 'image' | 'stock' | 'id' | 'categoryId'>;

interface CardsProps {
    list: ProductPreview[];
}

const Cards: React.FC<CardsProps> = ({ list }) => {
    const [items, setItems] = useState<ProductPreview[]>(list);
    const router = useRouter();
    const {addToCart, cart} = useCard();

    const onClickItem = (id: number)=> () => {
        return router.push(routes.product_detail + "/" + id);
    };

    const onCartClick = (product: any) => (event: React.MouseEvent) => {
        event.stopPropagation();
    
        const wasAdded:any = addToCart(product); 
    
        if (!wasAdded) {
          return; 
        }
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

    useEffect(()=>{
        setItems(list)
    },[list]);

    return (
        <div className="md:mx-auto md:my-10">
            <div className="grid grid-cols-2 gap-2 md:grid  md:grid-cols-3 md:gap-6">
                {items.map((product, idx)=> {
                    const {name, image, price, stock, id} = product;
                    const productInCart = cart.some((item) => item.id === id);
                    return (
                    <Card 
                    key={idx}
                    name={name}
                    image={image}
                    stock={stock}
                    price={price}
                    onClick={onClickItem((id))}
                    onCartClick={onCartClick(product)}
                    productInCart={productInCart}
                    handleNotAuthenticated={handleNotAuthenticated}

                    />
                )})}
                {!items.length && <p>No hay productos</p>}
            </div>
        </div>
    )
}

export default Cards;