import { Response, NextFunction } from "express";

import { AuthRequest } from "../../common/types/auth-request";

import { TaskService } from "./task.service";

export class TaskController {
  private taskService = new TaskService();

  createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const task = await this.taskService.createTask(
        req.user!.userId,
        req.body,
      );

      res.status(201).json({
        success: true,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  };

  getTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const task = await this.taskService.getTask(
        String(req.params.id),
        req.user!.userId,
      );

      res.json({
        success: true,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  };
  listTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = await this.taskService.listTasks(
        req.user!.userId,
        req.query,
      );

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("TASK ERROR:", error);
      next(error);
    }
  };

  updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const task = await this.taskService.updateTask(
        String(req.params.id),
        req.user!.userId,
        req.body,
      );

      res.json({
        success: true,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await this.taskService.deleteTask(
        String(req.params.id),
        req.user!.userId,
      );

      res.json({
        success: true,
        message: "Task deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  adminGetAllTasks = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.taskService.getAllTasksForAdmin(req.query);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
