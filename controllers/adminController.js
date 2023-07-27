const userModel = require("../models/userModel");
const router = require("../routes/authRoutes");

//GET USERS
const getusers = async (req, res) => {
  try {
    console.log(req.auth)
    if(req?.auth?.role==="admin"){
      const users = await userModel.find({});
      res.send({
        success: true,
        users,
      });
    }else{
      throw Error()
    }
  } catch (error) {
    console.log(error);
    res.send(403,{
      success: false,
      message: "Error in getusers API",
    });
  }
};

//DELETE USER
const deleteUser = async (req, res) => {
  try {
    const username = req.params.username;
    const deletedUser = await userModel.findOneAndDelete({ username });

    if (deletedUser) {
      res
        .status(200)
        .send({ success: true, message: "User deleted successfully" });
    } else {
      res.status(404).send({ success: false, message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error deleting user", error });
  }
};

// EDIT USERS
const updateuser = async (req, res) => {
  try {
    const { _id, username, email, role } = req.body;
    console.log(_id)
    await userModel.findOneAndUpdate(
      { _id },
      { $set: { username: username, email: email, role: role } }
    );
    res.send({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: error,
    });
  }
};

module.exports = { getusers, deleteUser, updateuser };
