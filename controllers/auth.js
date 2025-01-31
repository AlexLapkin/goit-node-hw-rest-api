const { schemas } = require("../models/user");
const { User } = require("../models/user");

const gravatar = require("gravatar");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs/promises");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

// Register
const register = async (req, res, next) => {
  try {
    const { error } = schemas.register.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({
      email,
      password: hashPassword,
      avatarURL,
    });
    if (!newUser) {
      return res.status(409).json({ message: "Email in use" });
    }
    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (err) {
    next(err);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    const { error } = schemas.login.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Logout
const logout = async (req, res, next) => {
  try {
    const { _id: id } = req.user;
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    await User.findByIdAndUpdate(id, { token: null });
    return res.status(204).json({ message: "No Content" });
  } catch (err) {
    next(err);
  }
};

// Get current user
const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.status(200).json({
      message: "Current user exists",
      user: {
        email,
        subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Update avatar
const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    // avatar Jimp
    Jimp.read(tempUpload)
      .then((image) => image.resize(250, 250).write(resultUpload))
      .catch((error) => console.log(error));

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.status(200).json({ avatarURL });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateAvatar,
};
