import React, { Suspense } from 'react';
import { getProducts } from '@/service/products';
import { getCategories } from '@/service/categories';
import { ICategory } from '@/types';
import CategoriesFilter from '@/components/CategoriesFilter';
import ProductsList from '@/components/ProductsList';

const ProductsView: React.FC  = async () => {
      const products = await getProducts();
      const categories: ICategory[] = await getCategories();
      return (
        <div className="flex flex-col">
            <div className='flex justify-center'>
            <h2 className="font-bold text-center text-lg md:text-2xl">PRODUCTOS</h2>
            </div>
          <div className="mr-4 flex ">
            <Suspense>
              <CategoriesFilter categories={categories} />
            </Suspense>
          </div>
    
          <div className="md:w-[950px] mb-2 max-w-full px-4 mx-auto">
            <Suspense>
              <ProductsList products={products} />
            </Suspense>
          </div>
        </div>
      );
}

export default ProductsView;