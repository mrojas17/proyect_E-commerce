"use client";

import { ICategory } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { BiCategory } from "react-icons/bi";

interface CategoriesFilterProps {
  categories: ICategory[];
}

const CategoriesFilter: React.FC<CategoriesFilterProps> = ({ categories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const [currentCategory, setCurrentCategory] = useState<number | null>(
    categoryId ? Number(categoryId) : null
  );
  const [isOpen, setIsOpen] = useState(false); 

  const generateUrl = (
    pathname: string,
    query: Record<string, string | boolean | number>
  ) => {
    const url = new URL(pathname, window.location.origin);
    Object.keys(query).forEach((key) => {
      url.searchParams.set(key, String(query[key]));
    });
    return url.toString();
  };

  const resetFilter = () => {
    setCurrentCategory(null);
    router.replace(generateUrl(pathname, {}));
  };

  useEffect(() => {
    if (currentCategory) {
      router.replace(generateUrl(pathname, { categoryId: currentCategory }));
    }
  }, [currentCategory]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-slate-900 rounded flex items-center left-4 z-50 ml-8"
      >
        <BiCategory size={24} />
        <span className="ml-2">Categorías</span>
      </button>
      <div
        className={`fixed top-0 left-0 mt-[104px] h-full w-64 p-0 bg-white shadow-lg z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2"
        >
          <X size={24} />
        </button>

        <div className="p-5">
          <h3 className="text-lg font-bold mb-4">Categorías</h3>
          <button
            onClick={resetFilter}
            className="block w-full text-left p-2 bg-gray-200 rounded mb-2"
          >
            Limpiar filtro
          </button>
          <ul>
            {categories.map((cat) => (
              <li key={cat.id} className="py-1">
                <button
                  onClick={() => setCurrentCategory(cat.id)}
                  className={`block w-full text-left p-2 rounded ${
                    cat.id === currentCategory ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default CategoriesFilter;
