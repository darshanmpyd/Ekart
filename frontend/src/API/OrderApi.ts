import { queryOptions } from "@tanstack/react-query";
import { productCartType } from "../Component/AddtoCart";
const token = sessionStorage.getItem("token");

const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;
export const getAllOrders = async () => {
  const response = await fetch(`${endpoint}/Orders/getOrders`, {
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

export const getOrderedProducts = () => {
  return queryOptions({
    queryKey: ["orders"],
    queryFn: getAllOrders,
    retry: false,
  });
};

export const OrderItems = async (product_details: productCartType) => {
  const response = await fetch(`${endpoint}/Orders/addOrder`, {
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
