import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import usersRouter from "./Routers/UserRouter.mjs";
import ProductsRouter from "./Routers/ProductsRouter.mjs";
import CartRouter from "./Routers/CartRouter.mjs";
import OrdersRouter from "./Routers/OrdersRouter.mjs";
import { PaymentsRouter } from "./Routers/PaymentRouter.mjs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
dotenv.config();

mongoose
  .connect("mongodb://localhost:27017/Ekart")
  .then(console.log("connected to db"))
  .catch((err) => console.log(`error while connecting to db ${err}`));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.use(cors());
app.use("/api/payments", PaymentsRouter);
app.use("/api/Users", usersRouter);
app.use("/api/Products", ProductsRouter);
app.use("/api/Cart", CartRouter);
app.use("/api/Orders", OrdersRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`❌ Error occurred: ${err}`);
    return;
  }
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
