import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import taskRoutes from "./modules/task/task.routes";
import adminRoutes from "./modules/task/admin.routes";
import uploadRoutes from "./modules/task/upload.routes";

import path from "path";
import { env } from "./config/env";
const app = express();
app.use(
  cors({
    origin:
      env.NODE_ENV === "production"
        ? env.FRONTEND_URL
        : "http://localhost:3000",
    credentials: true,
  }),
);
app.use(helmet());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(cookieParser());

app.use(express.json());

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
  });
});
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use(errorMiddleware);

export default app;
