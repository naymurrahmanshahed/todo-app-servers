const mongoose = require("mongoose");

const Todos = require("../models/todos.model");

//get all todos

const getAllTodos = async (req, res) => {
  console.log("hello");
  const user_id = req._id;
  const todos = await Todos.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(todos);
};

//get a single todos

const getSingleTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({
      error: "Please Enter Valid Id",
    });
  }
  const todo = await Todos.findById(id);

  if (!todo) {
    return res.status(404).json({ error: "No Todo Found" });
  }
  res.status(200).json(todo);
};

//post todo

const postTodo = async (req, res) => {
  const { title } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Field are Empty", emptyFields });
  }

  try {
    // const user_id = req._id;

    //create todo
    const todo = await Todos.create({
      ...req.body,
    });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete todo

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Please Enter valid id." });
  }

  const todo = await Todos.findOneAndDelete({ _id: id });

  if (!todo) {
    return res.status(400).json({ error: "No Todo Found" });
  }
  res.status(200).json(todo);
};

// update todo

const updateTodo = async (req, res) => {
  const { id } = req.params;

  const { title } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Please Enter Valid Id " });
  }

  const todo = await Todos.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!todo) {
    return res.status(400).json({ error: "No Todo Found" });
  }
  console.log(todo);
  res.status(200).json(todo);
};

module.exports = {
  getAllTodos,
  getSingleTodo,
  deleteTodo,
  postTodo,
  updateTodo,
};
