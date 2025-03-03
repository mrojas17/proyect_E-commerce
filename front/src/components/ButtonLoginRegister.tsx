import React from 'react'
import Link from 'next/link'
import { routes } from '@/routes/routes';

const ButtonLoginRegister = () => {
  return (
    <div className="flex justify-center items-center  md:space-x-6">
      <Link href={routes.login} className="text-gray-900">
        <button 
        className="flex flex-col items-center p-2 rounded-sm hover:bg-rose-200 text-gray-900">
          <h4>Iniciar Sesión</h4>
        </button>
      </Link>
      <Link href={routes.register} className="text-gray-900">
        <button 
        className="flex flex-col items-center p-2 rounded-sm text-gray- hover:bg-rose-200"
        >
          <h4>Registrarse</h4>
        </button>
      </Link>
    </div>
  );
}

export default ButtonLoginRegister