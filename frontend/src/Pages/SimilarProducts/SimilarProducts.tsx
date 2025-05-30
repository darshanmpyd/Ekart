import { useEffect } from "react";
import { getSimilarProducts } from "../../API/SimilarProducts";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ProductCard from "../../Cards/ProductCard";
import { productsType } from "../../Reducer/Products/types";
import LoadingSpinner from "../../Component/LoadingSpinner";

const SimilarProducts = () => {
  const selectedProduct = useSelector(
    (state: RootState) => state.product.selectedProduct
  );

  const title = selectedProduct?.title || "Annibale Colombo Sofa";

  const { mutate, data, isPending } = useMutation({
    mutationKey: ["getSimilarProducts"],
    mutationFn: () => getSimilarProducts(title, 10),
  });

  useEffect(() => {
    mutate();
  }, [selectedProduct]);

  if (isPending) {
    return <LoadingSpinner />;
  }
  if (!data) {
    return <h2>No suggestions available</h2>;
  }
  return (
    <div className="w-full overflow-x-auto">
      <h2 className="items-center text-4xl text-green-500 text-center">
        Similar Products
      </h2>
      <div className="flex flex-row space-x-3.5 py-1 min-w-max">
        {data.map((item: productsType) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
