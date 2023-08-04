const express = require("express");
const {
  getAllTodos,
  getSingleTodo,
  postTodo,
  deleteTodo,
} = require("../controllers/todos.controller");

const router = express.Router();

//get all todos

router.get("/", getAllTodos);

//get a single todo

router.get("/:id", getSingleTodo);

//post todo

router.post("/", postTodo);

//delete todo

router.delete("/:id", deleteTodo);

module.exports = router;
