import { productsType } from "../Reducer/Products/types";
import { useMutation } from "@tanstack/react-query";
import { addtoCart } from "../API/CartApi";

export type productCartType = {
  title: string;
  quantity: Number;
};

const AddtoCart = ({ product }: { product: productsType }) => {
  const { mutate } = useMutation({
    mutationFn: (product_details: productCartType) =>
      addtoCart(product_details),
  });

  const handleClick = async (title: string) => {
    const req_body: productCartType = {
      title: title,
      quantity: 1,
    };
    mutate(req_body);
  };

  return (
    <button
      className="bg-green-500 rounded-2xl text-white"
      onClick={() => handleClick(product.title)}
    >
      AddtoCart
    </button>
  );
};

export default AddtoCart;
