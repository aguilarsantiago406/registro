import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../features/products/api/productsApi'; 
import Loader from '../features/products/components/Loader';
import ErrorMsg from '../features/products/components/ErrorMsg';
import type { Product } from '@/mocks/products.data';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const {
    data: product, 
    isLoading,
    isError
  } = useQuery<Product, Error>({ 
    queryKey: ['product', id], 
    queryFn: () => getProductById(id!),
    enabled: !!id, 
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMsg message="No se pudo encontrar el producto." />;
  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/products" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Volver a la tienda
      </Link>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-96 object-contain border rounded p-4 bg-white"
        />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-500 text-lg my-2">{product.category}</p>
          <p className="text-3xl font-light my-4">s/.{product.price}</p>
          <h3 className="text-xl font-semibold mt-6 mb-2">Descripción</h3>
          <p className="text-gray-700">{product.description}</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold mt-6 hover:bg-blue-700">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
}