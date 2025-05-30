import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const getUserID = expressAsyncHandler((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header is missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.UserId = decoded.id; // Extract the user ID from the token
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});
