import mongoose, { Schema } from "mongoose";

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isadmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Users = mongoose.model("Users", UserSchema);
export default Users;
