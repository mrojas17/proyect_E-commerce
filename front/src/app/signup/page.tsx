import RegisterUser from '@/views/Register'
import React from 'react'

const Register = () => {
  return (
    <div className=" flex  min-h-screen">
      <div className="hidden  md:flex  flex-col  w-1/2  items-center  justify-center  bg-salmon  text-white">
          <h1 className=" text-4xl  font-bold">¿Nuevo aquí?</h1>
          <h1 className=" text-4xl  font-bold">Únete y explora la mejor tecnología.</h1>
      </div>
      <div className=" flex w-full  md:w-1/2  items-center  justify-center  p-6  bg-gray-100">
      <div className=" bg-white  p-8  rounded-lg  shadow-lg  w-full  max-w-md">
      <h2 className=" text-2xl  font-semibold  text-center  mb-6">Crear Cuenta</h2>
          <RegisterUser/>
        </div>
      </div>
    </div>
  )
}

export default Register