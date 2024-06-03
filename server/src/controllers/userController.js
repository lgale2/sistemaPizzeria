import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createToken } from "../config/jwt.config.js";
import dotenv from "dotenv";
dotenv.config({ path: "./variables.env" });

export const Register = async (req, res) => {
  const { UserName, Password } = req.body;
  try {
    const userFound = await User.findOne({ where: { UserName } });
    if (userFound) return res.status(400).json({ message: "Existing User" });

    const hashPassword = await bcrypt.hash(Password, 10);
    const userNew = await User.create({
      UserName,
      Password: hashPassword,
    });
    const token = await createToken({ id: userNew.Code });
    res.cookie("token", token);
    console.log(userNew);
    res.status(200).json({ message: "Registered user" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const { UserName, Password } = req.body;

    const userFound = await User.findOne({ where: { UserName } });
    if (!userFound) return res.status(404).json({ message: "User not found" });
    const passIsMatch = await bcrypt.compare(Password, userFound.Password);
    if (!passIsMatch)
      return res.status(401).json({ message: "Incorrect password" });
    //token
    const token = await createToken({ id: userFound.Code });
    res.cookie("token", token);
    res.json({
      Code: userFound.Code,
      UserName: userFound.UserName,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(0) });
    return res.status(200).json({ message: "User logout" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "Denied token" });
    }

    if (!process.env.TOKEN_SECRET) {
      return res.status(500).json({ message: "Server error" });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
      if (err) {
        console.log("Token verification failed:", err);
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userId = user.id;
      const userFound = await User.findByPk(userId);

      if (!userFound) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log(token);
      return res.json({
        Code: userFound.Code,
        UserName: userFound.UserName,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
