import { Response, NextFunction } from "express";
import { AuthRequest } from "../../common/types/auth-request";

export class UploadController {
  uploadFile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const fileUrl = `${process.env.APP_URL}/uploads/${req.file.filename}`;

      res.json({
        success: true,
        data: {
          url: fileUrl,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
