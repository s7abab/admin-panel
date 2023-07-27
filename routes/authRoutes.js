const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authController");
const {auth}=require("../middleware/authMiddleware")
const router = express.Router();

//REGISTER || POST
router.post("/register", registerController);
//LOGIN || POST
router.post("/login", loginController);
//U
router.post("/tokenCheck",auth,(req,res)=>res.send(200))

module.exports = router;
