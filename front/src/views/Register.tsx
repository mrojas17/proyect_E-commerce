"use client";    
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "@/service/user";
import Link from "next/link";
import { routes } from "@/routes/routes";
import { useRouter } from "next/navigation";
import usePublic from "@/app/hooks/usePublic";
import Swal from "sweetalert2";
import { LuEye, LuEyeClosed } from "react-icons/lu";

const registerSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/, "El correo debe contener '@' y terminar en '.com'")
    .required("El correo es obligatorio"),
    address: Yup.string().required("La dirección es obligatoria"),
    phone: Yup.string()
        .matches(/^\d+$/, "Debe ser un número válido")
        .min(10, "Debe tener al menos 10 dígitos")
        .required("El teléfono es obligatorio"),
    password: Yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Debe tener una mayúscula, una minúscula, un número, un carácter especial (@!-), y mínimo 8 caracteres")
    .required("La contraseña es obligatoria"),
});

interface FormData{
    name: string;
    email: string;
    address: string;
    phone: string;
    password: string;
}

const RegisterUser: React.FC = () => {
    usePublic();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const handleOnSubmit = async (values: FormData) => {
        try {
             await registerUser(values);
            Swal.fire({
                title: "Registro exitoso!",
                icon: "success",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                willClose: () => {
                    router.push(routes.login);  
                    },
            });
        } catch (e: any) {
            console.warn("Error al registrar el usuario", e);
        
            Swal.fire({
                title: "Ups!!!",
                text: e.message === "User already exists" 
                      ? "El email ya se encuentra registrado"
                      : "No se pudo realizar el registro. Intenta de nuevo.",
                icon: "error",
                showConfirmButton: true,
            });
        }
    };

    return(
        <div>
            <Formik
            initialValues={{name: '', email: '', address: '', phone: '', password: '' }}
            validationSchema={registerSchema}
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
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder="Nombre"
                        className=" w-full  p-3  mb-4  border  border-gray-300  rounded-lg"/>
                    {errors.name && touched.name && <p className=" text-red-500  text-sm">{errors.name}</p>}
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="Correo"
                        className=" w-full  p-3  mb-4  border  border-gray-300  rounded-lg"
                    />
                    {errors.email && touched.email && <p className=" text-red-500  text-sm">{errors.email}</p>}
                    <input
                        type="text"
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        placeholder="Dirección"
                        className=" w-full  p-3  mb-4  border  border-gray-300  rounded-lg"/>
                    {errors.address && touched.address && <p className=" text-red-500  text-sm">{errors.address}</p>}
                    <input
                        type="text"
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        placeholder="Teléfono"
                        className=" w-full  p-3  mb-4  border  border-gray-300  rounded-lg"/>
                    {errors.phone && touched.phone && <p className=" text-red-500  text-sm">{errors.phone}</p>}
                    <div className="relative w-full mb-2 rounded-lg border border-salmon">
                        <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className="w-full py-3 px-4 pr-12 rounded-lg outline-none border-transparent focus:ring-0 focus:shadow-none placeholder:text-gray-400"
                        placeholder="Contraseña"
                        />
                        <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        >
                        {showPassword ? <LuEye size={20} /> : <LuEyeClosed size={20} />}
                        </button>
                    </div>
                    {errors.password && touched.password && <p className=" text-red-500  text-sm">{errors.password}</p>}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className=" w-full  bg-salmon  text-center  hover:bg-salmonClaro  text-white  font-semibold  py-3  rounded-lg  transition  duration-300  mb-4"
                    >
                        {isSubmitting ? "Cargando..." : "Crear cuenta"}
                    </button>
                </form>
            )}
            </Formik>
            <div className=" text-center  mt-4  text-gray-600">
                <h4>¿Ya tienes una cuenta?</h4>
                <Link href={routes.login} className=" text-salmon  hover:underline">
                Inicia sesión y sigue comprando.
                </Link>
            </div>
        </div>
    )
};

export default RegisterUser;

