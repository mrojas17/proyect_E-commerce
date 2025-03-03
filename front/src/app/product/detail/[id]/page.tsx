import React from 'react';
import ProductDetail from '@/components/Detail';
import { getProductById } from '@/service/products';

const DetailProduct = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const parsedId = Number(id);
  if (isNaN(parsedId) || parsedId <= 0) {
    return <div>El ID del producto no es válido.</div>;
  }

  try {
    const product = await getProductById(parsedId);

    if (!product || !Array.isArray(product) || product.length === 0) {
      return <div>No existe ese producto.</div>;
    }

    return <ProductDetail {...product[0]} />;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return <div>Ocurrió un error al cargar el producto.</div>;
  }
};

export default DetailProduct;