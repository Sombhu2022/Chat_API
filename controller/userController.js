import { Users } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { sendCookic } from "../utils/sendCookies.js";
import { v2 as cloudinary } from "cloudinary";

export const createUser = async (req, res) => {
  try {
    const { name, email, dp, password } = req.body;

    const myCloud = await cloudinary.uploader.upload(dp, {
      folder: "userDP",
      width: 250,
      crop: "scale",
    });

    const emailExist = await Users.findOne({ email });
    if (emailExist)
      return res
        .status(400)
        .json({ success: false, message: "email allrady exist" });

    const hashPassword = await bcrypt.hash(password, 12);
    const user = await Users.create({
      name,
      email,
      dp: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      password: hashPassword,
    });

    sendCookic(user, res, "user created", 201);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "somthing wrong",
      error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "email or password not match" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "email or password not match" });

    sendCookic(user, res, "user logoin successfully", 201);
  } catch (error) {
    res.status(400).json({
      message: "somthing wrong!  user not login",
      error,
    });
  }
};

export const allUser = async (req, res) => {
  try {
    const user = await Users.find({});
    res.status(200).json({
      message: "all users",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "somthing error",
      error,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findById({ _id: id });
    res.status(200).json({
      message: "user fetched",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "somthing error",
      error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userDp = await Users.findById({_id:id})

    cloudinary.uploader.destroy(userDp.dp.public_id, (error, result) => {
        if (error) {
            console.error(error);
        }

    });

    const user = await Users.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .json({
        success: true,
        message: "User data successfull",
      });
  } catch (error) {
    res.status(400).json({
      message: "somthing error",
      error,
    });
  }
};

export const logout = (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .json({
        success: true,
        message: "Logout successfull",
      });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};
