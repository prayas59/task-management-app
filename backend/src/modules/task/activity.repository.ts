import { prisma } from "../../lib/prisma";

export class ActivityRepository {
  create(data: any) {
    return prisma.taskActivity.create({
      data,
    });
  }

  findByTask(taskId: string) {
    return prisma.taskActivity.findMany({
      where: { taskId },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
