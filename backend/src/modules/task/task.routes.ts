import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware";

import { validate } from "../../middleware/validation.middleware";

import { createTaskSchema, updateTaskSchema } from "./task.validation";

import { TaskController } from "./task.controller";
import { validateQuery } from "../../middleware/query-validation.middleware";
import { taskQuerySchema } from "./task.query.validation";

const router = Router();

const controller = new TaskController();

router.use(authenticate);

router.post("/", validate(createTaskSchema), controller.createTask);

router.get("/", validateQuery(taskQuerySchema), controller.listTasks);
router.get("/:id", controller.getTask);

router.patch("/:id", validate(updateTaskSchema), controller.updateTask);

router.delete("/:id", controller.deleteTask);

export default router;
