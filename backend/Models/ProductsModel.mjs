import mongoose, { Schema } from "mongoose";

const ProductsSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  discountPercentage: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  tags: {
    type: [String],
    default: [],
  },
  brand: {
    type: String,
  },
  sku: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  dimensions: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    depth: { type: Number, required: true },
  },
  warrantyInformation: {
    type: String,
  },
  shippingInformation: {
    type: String,
  },
  availabilityStatus: {
    type: String,
    default: "In Stock",
  },
  returnPolicy: {
    type: String,
  },
  minimumOrderQuantity: {
    type: Number,
    default: 1,
  },
  meta: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    barcode: { type: String },
    qrCode: { type: String },
  },
  images: {
    type: [String],
    default: [],
  },
  thumbnail: {
    type: String,
  },
  reviews: [
    {
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      reviewerName: {
        type: String,
        required: true,
      },
      reviewerEmail: {
        type: String,
        required: true,
      },
    },
  ],
});

const Products = mongoose.model("Products", ProductsSchema);
export default Products;
