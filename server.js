const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

//dotenv config
dotenv.config();

//mongoDB COnnection
connectDB();

const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:"*"
}))
app.use(cookieParser());

//routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.PORT}`.bgBlue.white);
});
