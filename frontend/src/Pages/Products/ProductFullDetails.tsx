import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CounterModal from "../../Component/CounterModal";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { productCartType } from "../../Component/AddtoCart";
import { addtoCart } from "../../API/CartApi";
import { OrderItems } from "../../API/OrderApi";
import SimilarProducts from "../SimilarProducts/SimilarProducts";

export type productOrderType = {
  title: string;
  quantity: Number;
  amount: Number;
};

const ProductFullDetails = () => {
  const selectedProduct = useSelector(
    (state: RootState) => state.product.selectedProduct
  );
  const queryClient = useQueryClient();
  if (selectedProduct === null) {
    return <h2>select any selectedProduct </h2>;
  }

  const { mutate } = useMutation({
    mutationFn: (product_details: productCartType) =>
      addtoCart(product_details),
    mutationKey: ["cart"],
    onSuccess: () => {
      // Invalidate the "cart" query to refetch updated cart data
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  const { mutate: Ordermutate } = useMutation({
    mutationFn: (product_details: productCartType) =>
      OrderItems(product_details),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // Use the instance method
    },
  });

  const handleCartSubmit = async (quantity: number) => {
    const req_body: productCartType = {
      title: selectedProduct.title,
      quantity: quantity,
    };
    mutate(req_body);
  };
  const handleOrderSubmit = async (quantity: number) => {
    const req_body: productOrderType = {
      title: selectedProduct.title,
      quantity: quantity,
      amount: selectedProduct.price * quantity,
    };
    Ordermutate(req_body);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 p-6 bg-white shadow-md rounded-xl">
        {/* Left: Image */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={selectedProduct.thumbnail}
            alt={selectedProduct.title}
            className="w-full max-w-sm rounded-lg object-cover"
          />
        </div>

        {/* Right: selectedProduct Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-semibold">{selectedProduct.title}</h1>
          <p className="text-gray-600">{selectedProduct.description}</p>
          <p className="text-xl font-bold text-green-600">
            ₹{selectedProduct.price}
          </p>

          <div className="text-sm text-gray-500 space-y-1">
            <p>
              <strong>Brand:</strong> {selectedProduct.brand}
            </p>
            <p>
              <strong>Stock:</strong>{" "}
              {selectedProduct.stock > 0 ? "In stock" : "Out of stock"}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {selectedProduct.rating} / 5
            </p>
            <p>
              <strong>Category:</strong> {selectedProduct.category}
            </p>
          </div>

          <CounterModal title="add to cart" handleSubmit={handleCartSubmit} />
          <CounterModal title="buy now" handleSubmit={handleOrderSubmit} />
          {/* <AddtoCart product={selectedProduct} /> */}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        {selectedProduct.reviews.map((review, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
          >
            <div className="flex justify-between">
              <span className="font-semibold">{review.reviewerName}</span>
              <span className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <div className="text-yellow-500">{"★".repeat(review.rating)}</div>
            <p className="mt-1 text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
      <SimilarProducts />
    </>
  );
};

export default ProductFullDetails;
