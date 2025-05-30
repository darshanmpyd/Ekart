import mongoose, { modelNames, Mongoose, Schema } from "mongoose";

const OrdersSchema = Schema(
  {
    products_details: [
      {
        product_id: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        payment_status: {
          type: Boolean,
          required: true,
          default: false,
        },
        amount: {
          type: Number,
          min: 1,
          required: true,
        },
        delivery_status: {
          type: String,
          default: "yet to dispatch",
        },
      },
    ],
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Orders = mongoose.model("Orders", OrdersSchema);
export default Orders;
