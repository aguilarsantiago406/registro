import axios from "axios";

export const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const getProducts = () => api.get("/products?limit=12");
export const getProductById = (id) => api.get(`/products/${id}`);