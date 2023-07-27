const express = require("express");
const { getusers, deleteUser, updateuser } = require("../controllers/adminController");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

// GET USERS
router.get("/getusers",auth,getusers);

//DELETE USERS
router.delete("/deleteuser/:username", deleteUser);

//EDIT USERS
router.put("/updateuser", updateuser )

module.exports = router;
