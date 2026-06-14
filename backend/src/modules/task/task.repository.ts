import { prisma } from "../../lib/prisma";

export class TaskRepository {
  create(data: any) {
    return prisma.task.create({
      data,
    });
  }

  findById(id: string) {
    return prisma.task.findUnique({
      where: { id },
    });
  }

  update(id: string, data: any) {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return prisma.task.delete({
      where: { id },
    });
  }

  findMany(where: any, skip: number, take: number, orderBy: any) {
    return prisma.task.findMany({
      where,
      skip,
      take,
      orderBy,
    });
  }

  count(where: any) {
    return prisma.task.count({
      where,
    });
  }

  findAll(skip: number, take: number) {
    return prisma.task.findMany({
      skip,
      take,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  countAll() {
    return prisma.task.count();
  }
}
