import Cards from '@/components/Cards'
import React from 'react'
import Carrusel from '@/components/Carrusel'
import { getProducts } from '@/service/products';

const HomeView: React.FC = async () => {
  const product = await getProducts();
  return (
    <div className="relative min-h-screen flex flex-col ">
      <div>
        <Carrusel />
      </div>
      <div className="max-w-full mx-auto px-4 py-12 md:w-[1000px]">
          <div>
            <h3 className="font-bold text-center sm:text-sm md:text-lg">PRODUCTOS DESTACADOS</h3>
            <Cards list={product} />
          </div>
      </div>
    </div>
  )
}

export default HomeView;