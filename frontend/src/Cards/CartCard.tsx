import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { cartType, productsType } from "../Reducer/Products/types";
import { setselectedProduct } from "../Reducer/Products/ProductsSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addtoCart } from "../API/CartApi";
import { useMutation } from "@tanstack/react-query";
import { productCartType } from "../Component/AddtoCart";

interface CartCardInterface {
  product: cartType;
}

const CartCard = ({ product }: CartCardInterface) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [qty, setQty] = useState(product.quantity);

  const { mutate } = useMutation({
    mutationKey: ["addtocart", product.title, qty],
    mutationFn: (body: productCartType) => addtoCart(body),
  });
  const increaseQty = () => {
    setQty((prev) => prev + 1);
    mutate({ title: product.title, quantity: qty });
  };
  const decreaseQty = () => {
    setQty((prev) => (prev > 1 ? prev - 1 : 1));
    mutate({ title: product.title, quantity: qty });
  };

  const handleProductClick = (product: productsType) => {
    dispatch(setselectedProduct(product));
    navigate("/full");
  };

  return (
    <div
      className="main-w-xs bg-white rounded-xl shadow-md overflow-x-auto hover:shadow-lg transition-shadow duration-300 w-70 m-1 p-1"
      key={product.title}
    >
      <div className="flex items-center border rounded-lg overflow-hidden w-max">
        <button
          onClick={decreaseQty}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-lg font-semibold disabled:opacity-50"
          disabled={qty <= 1}
        >
          −
        </button>
        <div className="px-6 py-2 text-lg font-medium border-x">{qty}</div>
        <button
          onClick={increaseQty}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-lg font-semibold"
        >
          +
        </button>
      </div>

      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-60 object-cover"
      />

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>

        <p className="text-sm text-gray-600 line-clamp-3">
          {product.description}
        </p>
        {/* Price */}
        <div className="text-xl font-bold text-green-700 mt-2">
          ₹{product.price}
        </div>

        {/* <ShowRatingsInStars rating={product.rating} /> */}
        {/* Add to Cart Button */}
        <button
          onClick={() => handleProductClick(product)}
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CartCard;
