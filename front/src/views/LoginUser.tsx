"use client";
import React, { useState } from 'react';
import { Formik } from 'formik';
import Link from "next/link";
import * as Yup from "yup";
import { loginUser } from '@/service/user';
import { routes } from '@/routes/routes';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import usePublic from '@/app/hooks/usePublic';
import Swal from 'sweetalert2';
import { LuEye, LuEyeClosed } from 'react-icons/lu';

const loginSchema = Yup.object({
    email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/, "El correo debe contener '@' y terminar en '.com'")
    .required("El correo es obligatorio"),
    password: Yup.string()
        .min(8, "Debe tener al menos 8 caracteres")
        .required("La contraseña es obligatoria"),
});

interface FormData {
    email: string;
    password: string;
}


const LoginUser: React.FC= () => {
    usePublic();
    const router = useRouter();
    const {saveUserData} = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const handleOnSubmit = async (values:
        FormData) => {
            try {
                const res = await loginUser(values);
                Swal.fire({
                    title: "Inicio de sesión exitoso!",
                    text: "Bienvenido.",
                    icon: "success",
                    width:500,
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    willClose: () => {
                        router.push(routes.home);  
                      },
                    });
                saveUserData(res);
                
            } catch (error: any) {

                console.warn("Error al iniciar sesión:", error);   
                Swal.fire({
                    title: "Ups!!!",
                    text: error.message === "User does not exist" 
                    ? "El correo no se encuentra registrado" 
                    : "Correo o contraseña incorrecta. Intenta de nuevo",
                    icon: "error",
                    showConfirmButton: true,
                })
            }
        };
    
    return(
        <div className="m-10">
            <Formik
            initialValues={{ 
                email: "",
                password: ""
            }}
            validationSchema={loginSchema}
            onSubmit={handleOnSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder='Correo'
                        className=" w-full  p-3  mb-4  border  border-gray-300  rounded-lg"
                    />
                    {errors.email && touched.email && <p className=" text-red-500  text-sm">{errors.email}</p>}
                    <div className="relative w-full mb-2 rounded-lg border border-salmon">
                        <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Contraseña"
                        className="w-full py-3 px-4 pr-12 rounded-lg outline-none border-transparent focus:ring-0 focus:shadow-none placeholder:text-gray-400"
                        />
                        <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        >
                        {showPassword ? <LuEye size={20} /> : <LuEyeClosed size={20} />}
                        </button>
                    </div>
                    {errors.password && touched.password && <p className=" text-red-500 text-sm">{errors.password}</p>}
                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-salmon text-center hover:bg-salmonClaro text-white font-semibold py-3 rounded-lg mb-4 "
                    >
                    {isSubmitting ? "Cargando..." : "Ingresar"}
                    </button>

                </form>
            )}
            </Formik>
            <div className=" text-center  mt-4  text-gray-600">
                <h4>¿No tienes una cuenta?</h4>
                <Link href={routes.register} className=" text-salmon  hover:underline">
                    Regístrate
                </Link>
            </div>
        </div>
    )
};

export default LoginUser;
