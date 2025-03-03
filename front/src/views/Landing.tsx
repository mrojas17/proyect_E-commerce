import { routes } from '@/routes/routes';
import Link from 'next/link';
import React from 'react'

const Landing = () => {
  return (
    <div className="h-screen bg-[url('/img/landing.jpg')] bg-cover bg-center">
  <div className="flex flex-col items-center justify-start pt-20 h-full text-center px-6">
    <h1 className="font-bold text-4xl tex-gray-900 mb-3">
      Descubre lo mejor de Apple en un solo lugar.
    </h1>
    <h2 className="text-xl">
      Innovación, calidad y tecnología al alcance de tu mano.
    </h2>
    <Link href={routes.home} className="mt-6">
      <button className="bg-salmon text-white py-3 px-6 rounded-lg text-lg shadow-md transition">
        Ir a la tienda
      </button>
    </Link>
  </div>
</div>

  )
}

export default Landing;