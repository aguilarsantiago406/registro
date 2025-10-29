import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../features/products/api/productsApi';
import Loader from '../features/products/components/Loader';
import ErrorMsg from '../features/products/components/ErrorMsg';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product } from '@/mocks/products.data'; 

export default function Products() {
  const {
    data: products = [], 
    isLoading,
    isError,
    error
  } = useQuery<Product[], Error>({ 
    queryKey: ['products'],
    queryFn: getProducts, 
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMsg message={error?.message || "Error al cargar productos"} />;
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Catálogo de Productos</CardTitle>
        <CardDescription>
          Listado de productos disponibles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Un listado de tus productos recientes.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Imagen</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Precio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No hay productos disponibles
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-12 w-12 object-contain rounded-md bg-white p-1"
                    />
                  </TableCell>
                  <TableCell className="font-medium max-w-xs truncate" title={product.title}>
                    {product.title}
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">S/.{product.price}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}