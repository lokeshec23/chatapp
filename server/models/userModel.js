// server/models/userModel.js
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    avatar: {
      type: String,
      default: "https://i.pravatar.cc/150", // A default avatar
    },
    about: {
      type: String,
      default: "Hey there! I am using this chat app.",
    },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);

const User = mongoose.model("User", userSchema);

export default User;
