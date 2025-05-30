import { useQuery } from "@tanstack/react-query";
import { getOrderedProducts } from "../../API/OrderApi";
import LoadingSpinner from "../../Component/LoadingSpinner";
import ProductCard from "../../Cards/ProductCard";
import { productsType } from "../../Reducer/Products/types";
const Orders = () => {
  const { data, isLoading, isError } = useQuery(getOrderedProducts());

  if (isLoading) return <LoadingSpinner />;

  if (isError || !data) {
    return (
      <h2 className="text-center text-2xl text-amber-400">No orders found</h2>
    );
  }

  return (
    <div className="flex flex-wrap">
      {data.detailedOrders.map(
        (order: { validProducts: productsType[] }, orderIndex: string) =>
          order.validProducts.map((product: productsType) => (
            <ProductCard
              product={product}
              key={product.id || `${orderIndex}-${product.title}`}
            />
          ))
      )}
    </div>
  );
};

export default Orders;
