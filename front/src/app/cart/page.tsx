import CartView from '@/views/CarroView'
import React from 'react'

const ShoppingCart = () => {
  return (
    <div className="md:px-16 md:mt-32">
      <div className="flex justify-center mb-10 font-bold md:text-xl">
        <h1>Tu carrito de compras</h1>
      </div>
      <div>
        <CartView />
      </div>
    </div>
  )
}

export default ShoppingCart