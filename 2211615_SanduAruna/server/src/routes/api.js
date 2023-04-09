import express from "express";
import { check } from "express-validator";
import Login from "../controllers/login.controller.js";
import { markTodo } from "../controllers/markTodo.controller.js";
import Register from "../controllers/Register.controller.js";
import { RemoveTodo } from "../controllers/RemoveTodo.controller.js";
import { createTodo } from "../controllers/todo.controller.js";
import { GetTodos } from "../controllers/todoList.controller.js";
import { LoginSchema } from "../validationSchema/LoginSchema.js";
import { RegisterSchema } from "../validationSchema/RegisterSchema.js";

const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post("/register", RegisterSchema, Register);
//1
apiRoute.post("/login", LoginSchema, Login);

//protected routes
apiProtected.post(
  "/createTodo",
  [check("desc", "Todo desc is required").exists()],
  createTodo
);

apiProtected.post(
  "/marktodo",
  [check("todo_id", "Todo id is required").exists()],
  markTodo
);

apiProtected.post(
  "/deleteTodo",
  [check("todo_id", "Todo desc is required").exists()],
  RemoveTodo
);


apiProtected.get(
  "/todolist",
  GetTodos,
);

export default apiRoute;
