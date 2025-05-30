import mongoose from "mongoose";
import { Schema } from "mongoose";

const CartSchema = Schema({
  Products_list: [
    {
      product_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Products",
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
    },
  ],
  user_details: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

const Carts = mongoose.model("Carts", CartSchema);
export default Carts;
