import express from "express"
import { protectRoute } from "../middleware/auth.mddleware.js";
import { addTodo,showTodo,updateTodo,deleteTodo,updateStatus} from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/show",protectRoute,showTodo)
router.post("/add",protectRoute,addTodo)
router.put("/update/:id", protectRoute, updateTodo)
router.delete("/delete/:id", protectRoute, deleteTodo)
router.put("/status/:id",protectRoute,updateStatus)

export default router;