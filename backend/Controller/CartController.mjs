import expressAsyncHandler from "express-async-handler";
import Carts from "../Models/CartSchema.mjs";
import Products from "../Models/ProductsModel.mjs";
import User from "../Models/UserModel.mjs";
import { addOrderUsingIdandData } from "./OrderController.mjs";

import { getUserID } from "../Middlewares/GetUserIDFromToken.mjs";
import mongoose from "mongoose";

export const addProductToCart = expressAsyncHandler(async (req, res) => {
  const { title, quantity } = req.body;
  const id = req.UserId;

  const product = await Products.findOne({ title: title });
  const user = await User.findOne({ _id: id });

  const userCart = await Carts.findOne({
    user_details: user._id,
  });

  if (userCart) {
    const productExists = await Carts.findOne({
      user_details: user._id,
      "Products_list.product_id": product._id,
    });

    if (productExists) {
      // Update quantity
      const updatedCart = await Carts.updateOne(
        {
          user_details: user._id,
          "Products_list.product_id": product._id,
        },
        {
          $set: { "Products_list.$.quantity": quantity },
        }
      );
      res.status(200).json(updatedCart);
    } else {
      // Add new product
      const updatedCart = await Carts.updateOne(
        { user_details: user._id },
        {
          $push: {
            Products_list: {
              product_id: product._id,
              quantity: quantity,
            },
          },
        }
      );
      res.status(200).json(updatedCart);
    }
  } else {
    // Create new cart
    const newCart = await Carts.create({
      Products_list: [
        {
          product_id: product._id,
          quantity: quantity,
        },
      ],
      user_details: user._id,
    });
    res.status(201).json(newCart);
  }
});

export const deleteProduct = [
  getUserID,
  expressAsyncHandler(async (req, res) => {
    const username = req.UserId;
    const User = await User.findOne({ username: username });
    const { product_id } = req.body;
    const updatedCart = await Carts.updateOne(
      { user_details: User._id },
      {
        $pull: {
          Products_list: { product_id: product_id },
        },
      }
    );
    res.send(updatedCart);
  }),
];

export const getCartItems = expressAsyncHandler(async (req, res) => {
  const id = req.UserId;

  // Find the user's cart
  const userCart = await Carts.findOne({ user_details: id });

  if (!userCart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  // Check if Products_list exists and is an array
  if (!Array.isArray(userCart.Products_list)) {
    return res
      .status(400)
      .json({ message: "Products_list is not defined or invalid" });
  }

  // Fetch product details for each product in the cart
  const detailedProducts = await Promise.all(
    userCart.Products_list.map(async (item) => {
      const product = await Products.findById(item.product_id);
      if (!product) {
        return null; // Handle case where product is not found
      }
      return {
        ...product.toObject(),
        quantity: item.quantity, // Include the quantity from the cart
      };
    })
  );

  // Filter out any null values (in case a product was not found)
  const validProducts = detailedProducts.filter((product) => product !== null);

  res.status(200).json({
    products: validProducts,
  });
});

export const moveCartToOrdersAfterPayment = expressAsyncHandler(
  async (req, res) => {
    const id = req.UserId;
    const userCart = await Carts.findOne({ user_details: id });

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    for (const item of userCart.Products_list) {
      // Fetch the product to get its title
      const product = await Products.findById(item.product_id);
      if (!product) continue; // Skip if product not found

      const data = {
        title: product.title,
        quantity: item.quantity,
        amount: Number(product.price * Number(item.quantity)),
      };
      try {
        await addOrderUsingIdandData(id, data);
      } catch {
        console.log(`unable to move product ${product.title}`);
      }
    }

    await Carts.deleteMany({ user_details: id });

    res
      .status(200)
      .json({ message: "Cart items moved to orders and cart cleared" });
  }
);
