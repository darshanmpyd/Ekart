import expressAsyncHandler from "express-async-handler";
import Users from "../Models/UserModel.mjs";
import bcrypt from "bcrypt";
import { generateToken } from "../Utils/generateToken.mjs";

//middleware to find users in db
const findUser = expressAsyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const User = await Users.findOne({ username: username });

  if (User) req.User = User;

  next();
});

// const findUserWithUsernameassword = expressAsyncHandler(
//   async (req, res, next) => {
//     const { username, password } = req.user;
//     const User = await Users.findOne({ username: username });
//     const matched = await bcrypt.compare(password, User.password);
//     if (matched) req.User = User;
//   }
// );

export const RegisterUser = [
  findUser,
  expressAsyncHandler(async (req, res) => {
    const { User } = req;
    const { username, password } = req.body;
    if (User) return res.status(404).send({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const new_user = await Users.create({
      username: username,
      password: hashedPassword,
    });
    res.status(201).send(new_user);
  }),
];

export const LoginUser = [
  findUser,
  expressAsyncHandler(async (req, res) => {
    const { User } = req;
    const { password } = req.body;
    if (!User) {
      res.status(404).json({ msg: "user not found" });
    }
    const matched = await bcrypt.compare(password, User.password);
    if (matched) {
      const token = generateToken(User._id);
      return res.status(200).send({ User, token: token });
    }
    res.status(401).json({ msg: "Invalid credentials" });
  }),
];

export const deleteuser = [
  findUser,
  expressAsyncHandler(async (req, res) => {
    const user = req.User;
    if (!user) {
      res.status(400).send("user does not exists");
    }
    const Deleteduser = await Users.deleteOne({ username: user.username });
    res.status(200).send(Deleteduser);
  }),
];

export const updateUser = expressAsyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const updatedUser = await Users.updateOne(
    { username: username },
    { $set: { password: password } }
  );
  res.status(200).send(updatedUser);
});

export const getAllUsers = expressAsyncHandler(async (req, res) => {
  res.send(await Users.find());
});

export const getUser = [
  findUser,
  expressAsyncHandler(async (req, res) => {
    const user = req.User;
    if (!user) return res.status(404).send("No user found");
    res.status(200).send(user);
  }),
];
