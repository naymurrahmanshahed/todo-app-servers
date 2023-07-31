require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouters = require("./routers/user.router");
//express app
const app = express();

//variables
const port = process.env.PORT || 5000;
const mongo_url = process.env.MONGO_URL;

//middlewares
app.use(express.json());

app.use(
  cors({
    credentials: true,
  })
);

app.use("/api/user", userRouters);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the todo app server" });
});

//mongodb
mongoose
  .connect(mongo_url, {
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Connected With mongodb on ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
