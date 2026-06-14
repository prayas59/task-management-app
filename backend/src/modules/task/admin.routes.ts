import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

import { TaskController } from "./task.controller";

const router = Router();

const controller = new TaskController();

router.get(
  "/tasks",
  authenticate,
  authorize("ADMIN"),
  controller.adminGetAllTasks,
);

export default router;
