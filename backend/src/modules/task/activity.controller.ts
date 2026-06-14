import { Response, NextFunction } from "express";
import { prisma } from "../../lib/prisma";
import { AuthRequest } from "../../common/types/auth-request";

export class ActivityController {
  getTaskActivity = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const activities = await prisma.taskActivity.findMany({
        where: {
          taskId: String(req.params.id),
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.json({
        success: true,
        data: activities,
      });
    } catch (error) {
      next(error);
    }
  };
}
