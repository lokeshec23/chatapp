// server/models/chatModel.js
import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
      default: "sender", // For one-on-one chats, we might not need a name
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // An array of users in the chat
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message", // The most recent message in the chat
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Only applicable for group chats
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
