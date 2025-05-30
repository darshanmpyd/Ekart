import { queryOptions } from "@tanstack/react-query";
import { productCartType } from "../Component/AddtoCart";
import { cartType } from "../Reducer/Products/types";

const token = sessionStorage.getItem("token") ?? undefined;
const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;
export const addtoCart = async (product_details: productCartType) => {
  const response = await fetch(`${endpoint}/Cart/addProduct`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product_details),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.msg);
  }
  return data;
};

export const getAllCartItemsQuery = () => {
  return queryOptions({
    queryKey: ["Cart"],
    queryFn: getAllCartItems,
    retry: false,
  });
};

const getAllCartItems = async (): Promise<{ products: cartType[] }> => {
  const response = await fetch(`${endpoint}/Cart/getProducts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.msg);
  }

  return data;
};
