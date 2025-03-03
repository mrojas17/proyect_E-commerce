import { routes } from "@/routes/routes";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer  className="bg-gray-800 text-white py-4 px-6 w-full">
          <div className="mx-20">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-semibold mb-4">Mi E-Commerce</h3>
                <p className="text-sm text-gray-300">
                  Descubre los mejores productos al mejor precio. Compra online con confianza.
                </p>
                <div className="flex  mt-4 space-x-4">
                  <FaFacebookF className="w-6 h-6 text-gray-100" />
                  <FaInstagram className="w-6 h-6 text-gray-100" />
                  <FaTwitter className="w-6 h-6 text-gray-100" />
                </div>
              </div>
      
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold mb-4">Enlaces útiles</h3>
                    <Link href={routes.home} className="text-sm hover:underline">
                      <h3>Inicio</h3>
                    </Link>
                    <Link href={routes.products} className="text-sm hover:underline">
                      <h3>Productos</h3>
                    </Link>
              </div>
      
              <div>
                <h3 className="text-lg font-semibold mb-4">Contáctanos</h3>
                <p className="text-sm text-gray-300">Correo: info@mi-ecommerce.com</p>
                <p className="text-sm text-gray-300">Teléfono: +123 456 789</p>
                <p className="text-sm text-gray-300">
                  Dirección: Calle Principal 123, Ciudad
                </p>
              </div>
            </div>
      
            <hr className="my-6 border-gray-700" />
            <div className="text-center text-sm text-gray-300">
              &copy; {new Date().getFullYear()} Mi E-Commerce. Todos los derechos reservados.
            </div>
          </div>
        </footer>
      );
  };
  
  export default Footer;