// server/controllers/userController.js
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc   Auth user/set token (Register or Login)
// @route  POST /api/users/auth
// @access Public
const authUser = async (req, res) => {
  const { phoneNumber, name } = req.body;

  if (!phoneNumber || !name) {
    res.status(400).json({ message: "Phone number and name are required." });
    return;
  }

  try {
    let user = await User.findOne({ phoneNumber });

    // If user doesn't exist, create a new one
    if (!user) {
      user = await User.create({
        phoneNumber,
        name,
      });
    }

    // If we have a user (either found or newly created), generate a token
    if (user) {
      const token = generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        avatar: user.avatar,
        token: token,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

// @desc   Get all users except the logged in user
// @route  GET /api/users
// @access Private
const getAllUsers = async (req, res) => {
  try {
    // req.user is populated by the protect middleware
    const users = await User.find({ _id: { $ne: req.user._id } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: `Server Error: ${error.message}` });
  }
};

export { authUser, getAllUsers };
