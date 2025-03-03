"use client"
import usePrivate from '@/app/hooks/usePrivate';
import CartItem from '@/components/CartItem'
import { useAuth } from '@/context/authContext';
import { useCard } from '@/context/CardContext';
import { routes } from '@/routes/routes';
import { DtoOrder, postOrder } from '@/service/order';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import Swal from 'sweetalert2';



export const CartView = () => {
  usePrivate();
  const router = useRouter();
  const  {cart, removeFromCart, resetCart} = useCard();
  const {token, user} = useAuth();
  const onTrashClick = (id: number) => () => {
    return removeFromCart(id);
  }
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);
  const onByClick = async() =>{
    try {
      
      if(!user){
        return
      }
      const data: DtoOrder = {
        userId: user.id,
        products: cart.map((p) => p.id),
      }
  
      await postOrder(data, token || "")
      Swal.fire({
          text: "Tu orden fue creada exitosamente",
          width: 300,
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
      })

      resetCart();
      setTimeout(() => 
      {router.push(routes.dashboard)},
      3200)
    } catch (error) {
      console.warn("No fue posibible crear la orden", error)
        Swal.fire({
          title: "Ups!!!",
          text: "Ocurrio un error al registrar la orden",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        })
    }
  }

  return (
    <div className="mx-4 my-6">
  <div className="flex flex-col items-center justify-center text-lg text-center text-salmon">
    {cart.length > 0 ? (
      <div className="mb-6 space-y-4 w-full">
        <div className="text-lg font-bold text-gray-800 text-center">
          Total:{" "}
          <span className="text-green-600 font-semibold">${totalPrice}</span>
        </div>

        <div className="flex flex-col items-center space-y-4 sm:flex sm:flex-row sm:justify-center sm:items-center sm:space-x-6 sm:space-y-0">
          <Link href={routes.products}>
            <button 
              className="bg-salmon text-white text-sm sm:text-base py-2 px-4 rounded-md sm:w-[120px] md:w-[290px]"
            >
              Seguir comprando
            </button>
          </Link>
          <button
            className="bg-salmon text-white text-sm sm:text-base py-2 px-4 rounded-md sm:w-[120px] md:w-[290px]"
            onClick={onByClick}
          >
            Terminar compra
          </button>
        </div>
      </div>
    ) : (
      <div className="flex-grow flex items-center justify-center flex-col h-80">
        <h2 className="text-lg font-semibold text-gray-600 ">Tu carrito está vacío</h2>
      </div>
    )}
  </div>
  {cart.map((product, idx) => (
    <CartItem
      key={idx}
      {...product}
      onTrashClick={onTrashClick(product.id)}
    />
  ))}
</div>
  )
}

export default CartView