require("dotenv").config();
const express = require("express");
const cors = require("cors");

//express app
const app = express();

//variables
const port = process.env.PORT || 5000;

//middlewares
app.use(express.json());

app.use(
  cors({
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the todo app server" });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
