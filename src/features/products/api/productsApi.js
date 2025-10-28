import { mockProducts, findProductById } from '@/mocks/products.data.js'; // Ajusta la ruta si es necesario

export const getProducts = () => {
  console.log("Simulando fetch a /products...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockProducts }); 
    }, 800); 
  });
};

export const getProductById = (id) => {
  console.log(`Simulando fetch a /products/${id}...`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = findProductById(id);
      if (product) {
        resolve({ data: product }); 
      } else {
        reject(new Error("Producto no encontrado"));
      }
    }, 500);
  });
};