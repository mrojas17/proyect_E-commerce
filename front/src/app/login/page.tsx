import LoginUser from '@/views/LoginUser'
import React from 'react'

const Login: React.FC = () => {
  return (
    <div className=" flex  w-full  min-h-screen">
      <div className="  flex  md:w-1/2  items-center  justify-center  p-6  bg-background">
      <div className=" bg-white  p-8  rounded-lg  shadow-lg  w-full  max-w-md">
          <h2 className=" text-2xl  font-semibold  text-center  mb-6">Iniciar Sesión</h2>
          <LoginUser />
        </div>
      </div>
      <div className="hidden  md:flex  md:w-1/2  items-center  justify-center  bg-salmon  text-white">
        <h1 className=" text-4xl  font-bold">¡Bienvenido!</h1>
      </div>
    </div>
  )
}

export default Login;