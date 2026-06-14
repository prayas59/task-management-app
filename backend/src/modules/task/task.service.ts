import { ApiError } from "../../common/responses/api-error";
import { prisma } from "../../lib/prisma";
import { TaskRepository } from "./task.repository";
import { getIO } from "../../socket";
import { ta } from "zod/v4/locales";
export class TaskService {
  private taskRepository = new TaskRepository();

  async createTask(userId: string, data: any) {
    const task = await this.taskRepository.create({
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      userId,
    });
    await prisma.taskActivity.create({
      data: {
        taskId: task.id,
        action: "TASK_CREATED",
      },
    });

    try {
      getIO().emit("task-created");
    } catch {}
    try {
      getIO().emit("activity-updated", {
        taskId: task.id,
      });
    } catch {}

    return task;
  }

  async getTask(taskId: string, userId: string) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    if (task.userId !== userId) {
      throw new ApiError(403, "Forbidden");
    }

    return task;
  }

  async updateTask(taskId: string, userId: string, data: any) {
    const existingTask = await this.getTask(taskId, userId);

    const updatedTask = await this.taskRepository.update(taskId, {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    });
    if (data.status && data.status !== existingTask.status) {
      await prisma.taskActivity.create({
        data: {
          taskId,
          action: "STATUS_CHANGED",
          oldValue: existingTask.status,
          newValue: data.status,
        },
      });

      try {
        getIO().emit("activity-updated", {
          taskId,
        });
      } catch {}
    }
    if (data.priority && data.priority !== existingTask.priority) {
      await prisma.taskActivity.create({
        data: {
          taskId,
          action: "PRIORITY_CHANGED",
          oldValue: existingTask.priority,
          newValue: data.priority,
        },
      });

      try {
        getIO().emit("activity-updated", {
          taskId,
        });
      } catch {}
    }

    try {
      getIO().emit("task-updated");
    } catch {}

    return updatedTask;
  }

  async deleteTask(taskId: string, userId: string) {
    await this.getTask(taskId, userId);
    await prisma.taskActivity.create({
      data: {
        taskId,
        action: "TASK_DELETED",
      },
    });

    try {
      getIO().emit("activity-updated", {
        taskId,
      });
    } catch {}
    const task = await this.taskRepository.delete(taskId);

    try {
      getIO().emit("task-deleted");
    } catch {}
    return task;
  }

  async listTasks(userId: string, query: any) {
    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const where: any = {
      userId,
    };

    if (query.status) {
      where.status = query.status;
    }

    if (query.search) {
      where.title = {
        contains: query.search,
        mode: "insensitive",
      };
    }

    const orderBy: any = {};

    if (query.sortBy) {
      orderBy[query.sortBy] = query.sortOrder === "asc" ? "asc" : "desc";
    } else {
      orderBy.createdAt = "desc";
    }

    const [tasks, total] = await Promise.all([
      this.taskRepository.findMany(where, skip, limit, orderBy),
      this.taskRepository.count(where),
    ]);

    return {
      tasks,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getAllTasksForAdmin(query: any) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const where: any = {};
    if (query.status) {
      where.status = query.status;
    }

    if (query.search) {
      where.OR = [
        {
          title: {
            contains: query.search,
            mode: "insensitive",
          },
        },
        {
          user: {
            name: {
              contains: query.search,
              mode: "insensitive",
            },
          },
        },
        {
          user: {
            email: {
              contains: query.search,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    const orderBy: any = {};

    if (query.sortBy) {
      orderBy[query.sortBy] = query.sortOrder === "asc" ? "asc" : "desc";
    } else {
      orderBy.createdAt = "desc";
    }

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          user: true,
        },
      }),

      prisma.task.count({ where }),
    ]);

    return {
      tasks,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
