import expressAsyncHandler from "express-async-handler";
import Products from "../Models/ProductsModel.mjs";

export const getAllProdducts = expressAsyncHandler(async (req, res) => {
  const prods = await Products.find({});
  return res.send(prods);
});

export const getProductspageWise = expressAsyncHandler(async (req, res) => {
  let page = parseInt(req.params.page, 10) || 1;
  const totalPages = await Products.countDocuments({});
  page = (page % Math.ceil(totalPages / 30)) + 1;
  const prods = await Products.find({})
    .skip((page - 1) * 30)
    .limit(20);

  res.send(prods);
});

export const addProduct = expressAsyncHandler(async (req, res) => {
  const data = req.body;
  const new_product = await Products.create(data);
  if (new_product) return res.status(201).json(new_product);
  res.status(404).send("product not added");
});

export const updateProduct = expressAsyncHandler(async (req, res) => {
  const data = req.body;
  await Products.deleteOne({ name: data.name });
  const new_product = await Products.create(data);
  if (new_product.updatedeCount > 0) return res.status(200).json(new_product);
  res.status(400).send("Product not updated");
});

export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const Product = await Products.deleteOne({ name: name });
  if (Product.deletedCount > 0) return res.status(200).send("Product deleted");
  res.send("item cannot be deleted");
});

export const addReview = expressAsyncHandler(async (req, res) => {
  const { product_name } = req.params;
  const {
    data: { review },
  } = req.body;
  const add_review = Products.updateOne(
    { name: product_name },
    { $push: { reviews: review } }
  );
});

export const deleteReview = expressAsyncHandler(async (req, res) => {
  const { product_name } = req.params;
  const {
    data: { review },
  } = req.body;
  const deltedReview = Products.updateOne(
    { name: product_name },
    { $pull: { reviews: review } }
  );
  if (deltedReview) return res.send("review delted successfully");
  res.send("review cannot be delted");
});

export const updateReview = expressAsyncHandler(async (req, res) => {
  const { product_name } = req.params;
  const {
    data: { review },
  } = req.body;
  Products.updateOne(
    { name: product_name },
    { $pull: { reviews: { name: data.name } } }
  );
  const add_review = Products.updateOne(
    { name: product_name },
    { $push: { reviews: review } }
  );

  if (addReview) return res.send("review edited successfully");
  res.send("review cannot be edited");
});
