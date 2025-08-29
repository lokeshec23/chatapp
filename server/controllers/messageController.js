// server/controllers/messageController.js
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";

// @desc   Send a new message
// @route  POST /api/messages
// @access Private
const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res
      .status(400)
      .json({ message: "Invalid data passed into request" });
  }

  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name avatar");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name phoneNumber avatar",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc   Get all messages for a chat
// @route  GET /api/messages/:chatId
// @access Private
const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name avatar phoneNumber")
      .populate("chat");
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { sendMessage, allMessages };
