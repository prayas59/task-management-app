import { z } from "zod";

export const taskQuerySchema = z.object({
  page: z.coerce.number().min(1).optional(),

  limit: z.coerce.number().min(1).max(100).optional(),

  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]).optional(),

  search: z.string().optional(),

  sortBy: z.enum(["createdAt", "dueDate", "priority"]).optional(),

  sortOrder: z.enum(["asc", "desc"]).optional(),
});
