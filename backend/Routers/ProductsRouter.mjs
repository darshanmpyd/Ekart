import { Router } from "express";
import {
  getAllProdducts,
  getProductspageWise,
  addProduct,
  updateProduct,
  deleteProduct,
  addReview,
  updateReview,
  deleteReview,
} from "../Controller/ProductsController.mjs";
const ProductsRouter = Router();

ProductsRouter.get("/getAllProducts", getAllProdducts);

ProductsRouter.get("/getProductsPageWise/:page", getProductspageWise);

ProductsRouter.post("/addProduct", addProduct);

ProductsRouter.put("/updateProduct", updateProduct);

ProductsRouter.delete("/deleteProduct", deleteProduct);

ProductsRouter.post("/addReview/:product_name", addReview);
ProductsRouter.put("/updateReview/:product_name", updateReview);
ProductsRouter.delete("/deleteReview/:product_name", deleteReview);

export default ProductsRouter;
