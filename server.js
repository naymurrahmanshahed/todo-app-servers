require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouters = require("./routers/user.router");
const todoRouters = require("./routers/todo.router");
//express app
const app = express();

//variables
const port = process.env.PORT || 5000;

//middlewares
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(
  cors({
    credentials: true,
  })
);

app.use("/api/user", userRouters);
app.use("/api/todos", todoRouters);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the todo app server" });
});

//mongodb
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Connected With mongodb on ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
