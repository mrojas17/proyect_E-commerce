"use client";
import React, { useState } from 'react';
import { useAuth } from '@/context/authContext';
import ButtonLoginRegister from '../ButtonLoginRegister';
import Link from 'next/link';
import { routes } from '@/routes/routes';
import { useCard } from '@/context/CardContext';
import { CiShoppingBasket, CiUser } from 'react-icons/ci';
import { useRouter } from 'next/navigation';
import { IoReload } from 'react-icons/io5';


const UserAuth = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { isAuthenticated, resetUserData } = useAuth();
    const {total, clearCart} = useCard();
    if(isAuthenticated === null) return (
        <div>
          <IoReload className="w-8 h-8"/>
        </div>
    );

      const toggleSlider = () => {
        setIsOpen(!isOpen);
      };
      const handleProfileRedirect = () => {
        setIsOpen(false); 
        router.push(routes.dashboard); 
      };

      const handleLogout = () => {
        resetUserData();
        clearCart();  
        router.push("/"); 
      };

    if(isAuthenticated){
        return (
            <div className="flex justify-center items-center md:space-x-5">
                <Link href={routes.shoppingCart}>
                <button className="relative flex flex-col items-center p-2 rounded-sm group">
                <CiShoppingBasket className="w-5 h-5 md:w-8 md:h-8 top-2 md:right-3" />
                <span className="absolute top-0 mt-7 left-1/2 transform -translate-x-1/2 text-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-900 px-3 py-2">
                  Carrito
                </span>
                    {total > 0 && (
                      <span 
                      className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-salmon text-white text-xs font-bold rounded-full animate-pulse"
                      >
                        {total}
                    </span>
                    )}
                </button>
                </Link>

                <div className="relative flex justify-center items-center space-x-1 md:space-x-5 mr-5">
                  <button
                    className="flex flex-col items-center p-2 rounded-sm group"
                    onClick={() => {
                      toggleSlider(); 
                    }}
                  >
                    <CiUser className="top-2 w-5 h-5 md:w-8 md:h-8 md:text-gray-900" />
                    <span className="absolute top-0 mt-7 left-1/2 transform -translate-x-1/2 text-[14px] opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300 text-gray-900 px-3 py-2">
                    Perfil
                  </span>
                  </button>

                  {isOpen && (
                    <div
                      className="absolute top-0 right-0 mt-14 w-48 p-2 bg-white shadow-lg rounded-lg border z-50 ease-in-out"
                    >
                      <div
                        className="flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded-md"
                        onClick={handleProfileRedirect}
                      >
                        <span>Ver perfil</span>
                      </div>
                      <div
                        className="flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded-md"
                        onClick={handleLogout}
                      >
                        <span>Cerrar sesión</span>
                      </div>
                    </div>
                  )}
                </div>
                {isOpen && (
              <div
                className="fixed inset-0 bg-transparent opacity-50 z-40"
                onClick={() => setIsOpen(false)}
              ></div>
            )}
            </div>
        )

    } return (
            <ButtonLoginRegister />
        )
};


export default UserAuth