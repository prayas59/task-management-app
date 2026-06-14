import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validation.middleware";
import { validateQuery } from "../../middleware/query-validation.middleware";

import { createTaskSchema, updateTaskSchema } from "./task.validation";
import { taskQuerySchema } from "./task.query.validation";

import { TaskController } from "./task.controller";
import { ActivityController } from "./activity.controller";

const router = Router();

const controller = new TaskController();
const activityController = new ActivityController();

router.use(authenticate);

router.post("/", validate(createTaskSchema), controller.createTask);

router.get("/", validateQuery(taskQuerySchema), controller.listTasks);

/* ACTIVITY ROUTE */
router.get("/:id/activity", activityController.getTaskActivity);

router.get("/:id", controller.getTask);

router.patch("/:id", validate(updateTaskSchema), controller.updateTask);

router.delete("/:id", controller.deleteTask);

export default router;
