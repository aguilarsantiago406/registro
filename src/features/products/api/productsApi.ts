import axios from 'axios';
import type { Product } from '@/mocks/products.data'; // Importamos el tipo

const api = axios.create({
  baseURL: '/api' 
});

interface ProductsResponse {
  data: Product[];
}
interface ProductResponse {
  data: Product;
}

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get<ProductsResponse>("/products");
  return res.data.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await api.get<ProductResponse>(`/products/${id}`);
  return res.data.data; // Cavamos dos niveles
};