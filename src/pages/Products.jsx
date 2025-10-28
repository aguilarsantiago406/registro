import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../features/products/api/productsApi';
import Loader from '../features/products/components/Loader';
import ErrorMsg from '../features/products/components/ErrorMsg';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Products() {
  const {
    data: products,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      if (Math.random() < 0.2) {
        throw new Error("Falla simulada del servicio (Error 500)");
      }
      const res = await getProducts();
      return res.data;
    }
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMsg message={error.message} />;
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Catálogo de Productos</CardTitle>
        <CardDescription>
          Listado de productos disponibles desde la API simulada.
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
            {products?.map((product) => (
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
                <TableCell className="text-right">${product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";