import { Router } from "express";
import { addOrder, getOrders } from "../Controller/OrderController.mjs";
import { getUserID } from "../Middlewares/GetUserIDFromToken.mjs";

const OrdersRouter = Router();

OrdersRouter.use(getUserID);

OrdersRouter.get("/getOrders", getOrders);

OrdersRouter.post("/addOrder", addOrder);

export default OrdersRouter;
