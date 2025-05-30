import { Router } from "express";
import {
  addProductToCart,
  deleteProduct,
  getCartItems,
  moveCartToOrdersAfterPayment,
} from "../Controller/CartController.mjs";
import { getUserID } from "../Middlewares/GetUserIDFromToken.mjs";
const CartRouter = Router();

CartRouter.use(getUserID);

CartRouter.get("/getProducts", getCartItems);

CartRouter.post("/addProduct", addProductToCart);

CartRouter.delete("/deleteProduct", deleteProduct);

CartRouter.post("/CartToOrders", moveCartToOrdersAfterPayment);

export default CartRouter;
