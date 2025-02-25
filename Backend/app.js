const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookies = require("cookie-parser")
dotenv.config();
const cors = require("cors");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes")
const captainRoutes = require("./routes/captain.routes")


connectToDb();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookies());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use('/users',userRoutes)
app.use("/captain", captainRoutes)

module.exports = app;
