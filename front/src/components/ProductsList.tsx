'use client'
import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import { useSearchParams } from 'next/navigation';
import { IProducts } from '@/types';

const ProductsList = ({products}:{products:IProducts[]}) => {
    const [filteredProducts, setFilteredProducts] = 
    useState<IProducts[]>(products);    
    const searchParams = useSearchParams();
    const categoryId = searchParams.get("categoryId");

    useEffect(() => {
        if(!categoryId){
            setFilteredProducts(products);
            return;
        }
        
        const crrCategoryId = Number(categoryId);
        setFilteredProducts(() => {
            return products?.filter((prod: IProducts) => prod.categoryId ===
            crrCategoryId);
        })        
    },[categoryId, products]);

    return (
        <Cards list={filteredProducts} />
    )
}

export default ProductsList