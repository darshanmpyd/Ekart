import { Router } from "express";
import {
  LoginUser,
  RegisterUser,
  deleteuser,
  updateUser,
  getAllUsers,
  getUser,
} from "../Controller/UserController.mjs";
const usersRouter = Router();

usersRouter.get("/getUser", getUser);

usersRouter.get("/allUsers", getAllUsers);

usersRouter.post("/register", RegisterUser);

usersRouter.post("/login", LoginUser);

usersRouter.delete("/deleteUser", deleteuser);

usersRouter.put("/updatePassword", updateUser);

export default usersRouter;
