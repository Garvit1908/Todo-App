const express = require("express");
const router = express.Router();
const {toggleTodo}=require("../controllers/todoController");

const { 
   createToDo,
   getAllTodos,
   getTodoById,
   updateTodo,
   deleteTodo
} = require("../controllers/todoController");


// Create Todo
router.post("/todos", createToDo);

// Get All Todos
router.get("/todos", getAllTodos);

// Get Single Todo
router.get("/todos/:id", getTodoById);

// Update Todo
router.put("/todos/:id", updateTodo);

// Delete Todo
router.delete("/todos/:id", deleteTodo);

router.put("/todos/toggle/:id",toggleTodo);



module.exports = router;
