import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { upload } from "../../middleware/upload.middleware";
import { UploadController } from "./upload.controller";

const router = Router();

const controller = new UploadController();

router.post("/", authenticate, upload.single("file"), controller.uploadFile);

export default router;
