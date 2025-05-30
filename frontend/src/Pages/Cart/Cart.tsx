import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getAllCartItemsQuery } from "../../API/CartApi";
import LoadingSpinner from "../../Component/LoadingSpinner";
import CartCard from "../../Cards/CartCard";
import { cartType } from "../../Reducer/Products/types";
import Payment from "../Payment/Payment";

const Cart = () => {
  const { data, isLoading } = useQuery(getAllCartItemsQuery());

  const cart_data = useMemo(() => {
    return data?.products.map((item) => ({
      id: item.title,
      quantity: item.quantity,
      amount: item.quantity * item.price,
    }));
  }, [data?.products]);

  if (isLoading) return <LoadingSpinner />;
  if (!data?.products) {
    return (
      <h2 className="text-center text-2xl text-red-500">No products in cart</h2>
    );
  }
  // Check if data.products exists and is an array
  if (data.products.length == 0) {
    console.error("Invalid data structure:", data);
    return (
      <div className="text-center text-2xl text-amber-500">
        No products found in the cart.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap m-2 ">
        {data.products.map((product: cartType, index: number) => {
          if (!product || !product.thumbnail) {
            console.warn(`Invalid product at index ${index}`, product);
            return null; // Skip rendering invalid products
          }

          return <CartCard key={product.id || index} product={product} />;
        })}
      </div>
      {data && (
        <div className="items-center ml-50 p-2 w-100">
          <Payment cart={cart_data ?? []} />
        </div>
      )}
    </>
  );
};

export default Cart;
