import { routes } from "@/routes/routes";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className=" flex  flex-col  items-center  justify-center  min-h-screen  bg-gray-100  text-gray-800">
      <h1 className=" text-6xl  font-bold  mb-4">404</h1>
      <h2 className=" text-2xl  font-semibold  mb-2">Página no encontrada</h2>
      <p className=" text-gray-600  mb-6">Lo sentimos, la página que buscas no existe.</p>
      <Link href={routes.home} className=" flex  items-center  gap-2  bg-salmon  text-white  px-6  py-3  rounded-lg  shadow-md  hover:bg-rose-300  transition">
        <FaHome /> Volver al inicio
      </Link>
    </div>
  );
}
