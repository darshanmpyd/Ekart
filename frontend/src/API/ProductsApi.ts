import { queryOptions } from "@tanstack/react-query";
import { productsType } from "../Reducer/Products/types";
// "http://localhost:3000/api/products/getAllProducts"
// https://dummyjson.com/products?limit=194

const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;
const getproducts = async (): Promise<productsType[]> => {
  const response = await fetch(`${endpoint}/products/getAllProducts`);
  return await response.json();
};

export const getProductsApi = () => {
  return queryOptions({
    queryKey: ["products"],
    queryFn: getproducts,
  });
};

export const getProductsPageWise = async (page: number, search: string) => {
  const response = await fetch(
    `${endpoint}/products/getProductsPageWise/${page}?search=${search}`
  );
  return await response.json();
};
