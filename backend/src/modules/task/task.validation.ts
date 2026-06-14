import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1).max(200),

  description: z.string().optional(),

  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]).optional(),

  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),

  dueDate: z.string().datetime().optional(),

  attachmentUrl: z.string().url().optional(),
});

export const updateTaskSchema = createTaskSchema.partial();
