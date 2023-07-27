const { default: mongoose } = require("mongoose");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    if (!username || !password || !email || !role) {
      return res.send({
        success: false,
        message: "Enter all fields",
      });
    }
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.send({
        success: false,
        message: "Username already exist",
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    //rest data
    const user = new userModel(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User registerd Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

//LOGIN CONTROLLER
const loginController = async (req, res) => {
  try {
    console.log(req.headers.authorization);
    const { username, password } = req.body;
    if (!username || !password) {
      return res.send({
        success: false,
        message: "Fieled not completely filled",
      });
    }
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(403).send({
        success: false,
        message: "Invalid Credential",
      });
    }

    //Compare password
    const comparePassword = await bcrypt.compare(
      password,
      user.password
    );
    if (!comparePassword) {
      return res.status(403).send({
        success: false,
        message: "Password doesnt match",
      });
    }
    //Everything is ok
    const token = jwt.sign({_id:user._id,role:user?.role}, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};




module.exports = { registerController, loginController };
