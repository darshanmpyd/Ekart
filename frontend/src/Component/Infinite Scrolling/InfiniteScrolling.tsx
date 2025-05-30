import { useCallback, useEffect, useRef, useState } from "react";
import { productsType } from "../../Reducer/Products/types";
import { getProductsPageWise } from "../../API/ProductsApi";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner";
import ProductCard from "../../Cards/ProductCard";

const InfiniteScrolling = ({ search }: { search: string }) => {
  const [page, setPage] = useState(1);
  const [hasMore, sethasMore] = useState<boolean>(true);
  const [productsData, setProductsData] = useState<productsType[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["getProductsPagewise", page],
    mutationFn: () => getProductsPageWise(page, search),
    onSuccess: (data: productsType[]) => {
      setProductsData((prev) => [...prev, ...data]);
      if (data.length == 0) sethasMore(false);
    },
  });

  useEffect(() => {
    mutate();
  }, [page]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || isPending || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      setPage((prev) => prev + 1);
    }
  }, [isPending, hasMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  //   if (isPending) return <LoadingSpinner />;
  if (isError) return <h2>Error while fetching data</h2>;
  if (!productsData) {
    return (
      <div className="items-center text-center">
        <h2 className="text-red">No products available</h2>
      </div>
    );
  }
  return (
    <div
      ref={containerRef}
      className="flex flex-row flex-wrap"
      style={{ height: "80vh", overflow: "auto" }}
    >
      {productsData.map((product) => (
        <ProductCard product={product} />
      ))}
      {isPending && <LoadingSpinner />}
      {!hasMore && <h3>No more products available</h3>}
    </div>
  );
};

export default InfiniteScrolling;
