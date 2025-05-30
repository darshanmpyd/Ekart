import { getProductsApi } from "../../API/ProductsApi";
import { useSuspenseQuery } from "@tanstack/react-query";
import ProductCard from "../../Cards/ProductCard";
import LoadingSpinner from "../../Component/LoadingSpinner";
import { useMemo, useState } from "react";
import { productsType } from "../../Reducer/Products/types";
import InfiniteScrolling from "../../Component/Infinite Scrolling/InfiniteScrolling";

const Products = () => {
  const { data, isLoading } = useSuspenseQuery(getProductsApi());
  const [search, setSearch] = useState("");
  if (isLoading) {
    return <LoadingSpinner />;
  }
  const filteredProducts: productsType[] | null = useMemo(() => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);
  return (
    <>
      <div className="items-center text-center flex flex-row gap-1.5 px-155   ">
        <h3 className="text-red-800">Search :</h3>
        <input
          type="text"
          name="search"
          id="search"
          className="border border-black m-2 p-2"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredProducts.length === 0 && (
        <div className="items-center text-center text-3xl text-orange-400">
          No products available
        </div>
      )}
      {search !== "" ? (
        <div className="flex flex-wrap">
          {filteredProducts.map(
            (item) =>
              item.title.toLowerCase().includes(search.toLowerCase()) && (
                <ProductCard product={item} />
              )
          )}
        </div>
      ) : (
        <InfiniteScrolling search={search} />
      )}
    </>
  );
};

export default Products;
