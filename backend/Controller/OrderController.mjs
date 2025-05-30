import expressAsyncHandler from "express-async-handler";
import { getUserID } from "../Middlewares/GetUserIDFromToken.mjs";
import Orders from "../Models/OrdersSchema.mjs";
import mongoose from "mongoose";
import Products from "../Models/ProductsModel.mjs";
import Users from "../Models/UserModel.mjs";

export const addOrderUsingIdandData = async (id, data) => {
  const product = await Products.findOne({ title: data.title });
  if (!product) throw new Error("Product not found");

  const user = await Users.findOne({ _id: id });
  if (!user) throw new Error("User not found");

  const UserInOrders = await Orders.findOne({ user_id: user._id });

  if (UserInOrders) {
    const productExists = UserInOrders.products_details.find(
      (item) => item.product_id.toString() === product._id.toString()
    );

    if (productExists) {
      const updated_order = await Orders.updateOne(
        { user_id: user._id, "products_details.product_id": product._id },
        {
          $set: {
            "products_details.$.quantity":
              productExists.quantity + data.quantity,
          },
        }
      );
      return { message: "Order updated", updated_order };
    } else {
      const updated_order = await Orders.updateOne(
        { user_id: user._id },
        {
          $push: {
            products_details: {
              product_id: product._id,
              quantity: data.quantity,
              amount: data.amount,
              payment_status: true,
            },
          },
        }
      );
      return { message: "Product added to order", updated_order };
    }
  } else {
    const new_order = await Orders.create({
      user_id: user._id,
      products_details: [
        {
          product_id: product._id,
          quantity: data.quantity,
          amount: data.amount,
          payment_status: data.payment_status || false,
          delivery_status: data.delivery_status || "yet to dispatch",
        },
      ],
    });
    return { message: "Order created", new_order };
  }
};

export const addOrder = expressAsyncHandler(async (req, res) => {
  const id = req.UserId; // Extract user ID from middleware
  const data = req.body; // Extract request body

  try {
    const result = await addOrderUsingIdandData(id, data);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export const getOrders = expressAsyncHandler(async (req, res) => {
  const id = req.UserId;

  const user = await Users.findOne({ _id: id });

  // Find the user's orders
  const orders = await Orders.find({ user_id: user._id });

  if (!orders || orders.length === 0) {
    return res.status(404).json({ message: "No orders found for this user" });
  }

  // Fetch product details for each product in the orders
  const detailedOrders = await Promise.all(
    orders.map(async (order) => {
      const detailedProducts = await Promise.all(
        order.products_details.map(async (item) => {
          const product = await Products.findById(item.product_id);
          if (!product) {
            return null; // Handle case where product is not found
          }
          return {
            ...product.toObject(),
            quantity: item.quantity, // Include the quantity from the order
          };
        })
      );

      // Filter out any null values (in case a product was not found)
      const validProducts = detailedProducts.filter(
        (product) => product !== null
      );

      return {
        validProducts,
      };
    })
  );

  res.status(200).json({
    detailedOrders,
  });
});
