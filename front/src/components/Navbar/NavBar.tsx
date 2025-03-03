import Link from "next/link";
import { routes } from "@/routes/routes";
import UserAuth from "./UserAuth";


const NavBar = () => {

    return (
        <nav className="w-full md:bg-gray-100 shadow-md">
          <div className="container flex flex-row justify-between items-center px-6 md:px-6 md:py-3">
            <h1 className="text-xl font-bold text-gray-800 md:text-2xl">Mi eCommerce</h1>
            <div className="flex items-center space-x-2">
              <UserAuth />
            </div>
          </div>
      
          <div className="flex justify-center items-center bg-slate-900 space-x-4 h-8 md:h6 md:space-x-28">
            <Link href={routes.home} className="text-white hover:text-slate-300">
              Inicio
            </Link>
            <Link href={routes.products} className="text-white hover:text-slate-300">
              Productos
            </Link>
          </div>
        </nav>
      );
};

export default NavBar;