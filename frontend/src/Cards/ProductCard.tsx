import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { productsType } from "../Reducer/Products/types";
import ShowRatingsInStars from "../Component/ShowRatingsInStars";
import { setselectedProduct } from "../Reducer/Products/ProductsSlice";
import { useNavigate } from "react-router-dom";
interface ProductcardInterface {
  product: productsType;
}

const ProductCard = ({ product }: ProductcardInterface) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleProductClick = (product: productsType) => {
    dispatch(setselectedProduct(product));
    navigate("/full");
  };
  return (
    <div
      className="max-w-xs bg-white rounded-xl shadow-md overflow-x-auto hover:shadow-lg transition-shadow duration-300 w-70 m-2 p-2"
      onClick={() => handleProductClick(product)}
      key={product.title}
    >
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

        <ShowRatingsInStars rating={product.rating} />
        {/* Add to Cart Button */}
        <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
