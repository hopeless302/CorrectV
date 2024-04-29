const express = require(`express`);

const router = express.Router();
const todos = [];

module.exports = () => {
  router.post("/", (req, res) => {
    // Extract data from req.body
    const { title, id, is_completed } = req.body;
    if (!title) {
      return res.status(400).send({ error: "Title is required" });
    }
    const newTodo = {
      title: title,
      id: id,
      is_completed: is_completed || false,
    };
    todos.push(newTodo);
    console.log("inside post todos array", todos);
    console.log("inside popst newTodo object", newTodo);

    // Send a response with the newly created todo
    res.status(201).send({ todo: newTodo });
  });

  router.get("/", (req, res) => {
    res.send({ todos: todos });
  });

  router.delete("/:id", (req, res) => {
    const todoId = req.params.id;

    // Find the index of the todo with the given id in the todos array
    const index = todos.findIndex((todo) => todo.id === todoId);

    // If todo is found, remove it from the todos array
    if (index !== -1) {
      todos.splice(index, 1);
      console.log("inside delete todos", todos);
      res.send({ message: "Todo deleted successfully" });
    } else {
      res.status(404).send({ error: "Todo not found" });
    }
  });

  // PATCH route to update a todo by ID
  router.patch("/:id", (req, res) => {
    const todoId = req.params.id;
    console.log("todoId", todoId);
    const { title, is_completed } = req.body;
    const todoToUpdate = todos.find((todo) => todo.id === todoId);
    console.log("todotoupdate", todoToUpdate);
    if (!todoToUpdate) {
      return res.status(404).send({ error: "Todo not found" });
    }

    if (title) {
      todoToUpdate.title = title;
      res.send({ message: "Todo updated successfully" });
    }

    if (is_completed !== undefined) {
      todoToUpdate.is_completed = is_completed;
    }

    res.send({ todo: todoToUpdate });
  });

  return router;
};