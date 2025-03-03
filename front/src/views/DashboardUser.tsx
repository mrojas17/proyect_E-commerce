"use client";
import usePrivate from '@/app/hooks/usePrivate';
import { useAuth } from '@/context/authContext';
import { getUsersOrders } from '@/service/user';
import { IOrder } from '@/types';
import React, { useEffect, useState } from 'react';

const UserProfile: React.FC = () => {
  usePrivate(); 
  const [orders, setOrders] = useState<IOrder[]>([]);
  const {user, token} = useAuth();
  
  useEffect(()=> {
    const request = async () =>{
      if (!token) return;
      const newOrders = await getUsersOrders(token)
      setOrders(newOrders)
    };
    request();
  }, [token])
  return (
    <div className="md:mx-32 mt-8 items-center justify-center ">
      <div className="md:mx-32 px-3">
        <h1 className="text-center font-bold text-xl sm:text-2xl">Usuario</h1>
  
        <div className="grid  md:grid-cols-2 grid-cols-1 gap-4 p-4 shadow-xl bg-white rounded-lg ">
          <div>
            <span className="block font-bold mb-1">Nombre</span>
            <p className="border border-gray-800 text-gray-800 text-center sm:text-sm rounded-lg h-10 p-2">
              {user?.name || "No disponible"}
            </p>
          </div>
          <div>
            <span className="block font-bold mb-1">Correo</span>
            <p className="border border-gray-800  text-gray-800 text-center rounded-lg h-10 p-2">
              {user?.email || "No disponible"}
            </p>
          </div>
          <div>
            <span className="block font-bold mb-1">Dirección</span>
            <p className="border border-gray-800  text-gray-800 text-center rounded-lg h-10 p-2">
              {user?.address || "No disponible"}
            </p>
          </div>
          <div>
            <span className="block font-bold mb-1">Teléfono</span>
            <p className="border border-gray-800  text-gray-800 text-center rounded-lg h-10 p-2">
              {user?.phone || "No disponible"}
            </p>
          </div>
        </div>
  
        <h1 className="text-center font-bold text-xl sm:text-2xl mt-6">Historial de Ordenes</h1>
  
        <div className="p-4 shadow-xl bg-white rounded-lg">
          {orders?.length > 0 ? (
            orders.map((order) => {
              const getOrdersTotal = (products: any) =>
                products.reduce((total: number, product: any) => total + (product.price || 0), 0);
  
              return (
                <div
                  key={order.id}
                  className="border border-gray-300 rounded-lg shadow-md p-4 bg-white mb-4"
                >
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-700">Orden ID:</h3>
                      <p className="text-gray-900">{order.id}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-700">Cantidad de productos:</h3>
                      <p className="text-gray-900">{order.products.length}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-700">Total:</h3>
                      <p className="text-green-600 font-bold">${getOrdersTotal(order.products)}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-600">No hay órdenes disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

